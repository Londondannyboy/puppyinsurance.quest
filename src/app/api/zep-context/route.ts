import { NextRequest, NextResponse } from 'next/server';

const ZEP_API_KEY = process.env.ZEP_API_KEY || '';

// Categorize a fact into puppy insurance ontological type
function categorize(fact: string): 'dog_breed' | 'dog_name' | 'dog_age' | 'health' | 'insurance' | 'fact' {
  const lower = fact.toLowerCase();

  // Dog breed keywords
  if (['labrador', 'retriever', 'bulldog', 'poodle', 'shepherd', 'beagle', 'boxer', 'terrier', 'spaniel', 'husky', 'breed', 'mixed breed'].some(k => lower.includes(k))) {
    return 'dog_breed';
  }
  // Dog name keywords
  if (['named', "dog's name", 'called', 'puppy named', 'dog is'].some(k => lower.includes(k))) {
    return 'dog_name';
  }
  // Age keywords
  if (['year old', 'years old', 'months old', 'puppy', 'senior', 'age'].some(k => lower.includes(k))) {
    return 'dog_age';
  }
  // Health keywords
  if (['health', 'condition', 'hip', 'dysplasia', 'allergy', 'breathing', 'heart', 'surgery', 'vet'].some(k => lower.includes(k))) {
    return 'health';
  }
  // Insurance keywords
  if (['plan', 'coverage', 'premium', 'quote', 'basic', 'standard', 'comprehensive', 'deductible'].some(k => lower.includes(k))) {
    return 'insurance';
  }
  return 'fact';
}

// Clean up fact text for display
function cleanFact(fact: string): string {
  return fact
    .replace(/^(the user |user |they |he |she |their dog )/i, '')
    .replace(/^(is |are |has |have |wants |prefers )/i, '')
    .trim();
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  if (!userId || !ZEP_API_KEY) {
    return NextResponse.json({
      context: '',
      facts: [],
      entities: { breeds: [], names: [], ages: [], health: [], insurance: [] }
    });
  }

  try {
    // Use puppyinsurance prefix for Zep user ID
    const zepUserId = `puppyinsurance_${userId}`;

    // Fetch user's memory from Zep knowledge graph
    const response = await fetch('https://api.getzep.com/api/v2/graph/search', {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${ZEP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: zepUserId,
        query: 'dog breed name age health insurance plan coverage preferences',
        limit: 15,
        scope: 'edges',
      }),
    });

    if (!response.ok) {
      console.error('[Zep] Graph search failed:', response.status);
      return NextResponse.json({
        context: '',
        facts: [],
        entities: { breeds: [], names: [], ages: [], health: [], insurance: [] }
      });
    }

    const data = await response.json();
    const edges = data.edges || [];

    // Extract and categorize facts
    const categorizedFacts: Array<{ fact: string; type: string; clean: string }> = [];
    const entities = {
      breeds: [] as string[],
      names: [] as string[],
      ages: [] as string[],
      health: [] as string[],
      insurance: [] as string[],
    };

    for (const edge of edges) {
      if (!edge.fact) continue;

      const type = categorize(edge.fact);
      const clean = cleanFact(edge.fact);

      categorizedFacts.push({ fact: edge.fact, type, clean });

      // Collect unique entities by type
      if (type === 'dog_breed' && !entities.breeds.includes(clean)) {
        entities.breeds.push(clean);
      } else if (type === 'dog_name' && !entities.names.includes(clean)) {
        entities.names.push(clean);
      } else if (type === 'dog_age' && !entities.ages.includes(clean)) {
        entities.ages.push(clean);
      } else if (type === 'health' && !entities.health.includes(clean)) {
        entities.health.push(clean);
      } else if (type === 'insurance' && !entities.insurance.includes(clean)) {
        entities.insurance.push(clean);
      }
    }

    // Build context string grouped by type
    const contextParts: string[] = [];

    if (entities.breeds.length) {
      contextParts.push(`Dog Breed: ${entities.breeds.join(', ')}`);
    }
    if (entities.names.length) {
      contextParts.push(`Dog Name: ${entities.names.join(', ')}`);
    }
    if (entities.ages.length) {
      contextParts.push(`Dog Age: ${entities.ages.join(', ')}`);
    }
    if (entities.health.length) {
      contextParts.push(`Health Notes: ${entities.health.join(', ')}`);
    }
    if (entities.insurance.length) {
      contextParts.push(`Insurance Interest: ${entities.insurance.join(', ')}`);
    }

    const context = contextParts.length > 0
      ? contextParts.join('\n')
      : '';

    return NextResponse.json({
      context,
      facts: categorizedFacts,
      entities,
    });
  } catch (error) {
    console.error('[Zep] Error:', error);
    return NextResponse.json({
      context: '',
      facts: [],
      entities: { breeds: [], names: [], ages: [], health: [], insurance: [] }
    });
  }
}
