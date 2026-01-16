import { NextRequest, NextResponse } from 'next/server';

const ZEP_API_KEY = process.env.ZEP_API_KEY || '';

// Categorize a fact into ontological type
function categorize(fact: string, edgeName?: string): 'destination' | 'budget' | 'timeline' | 'interest' | 'preference' | 'fact' {
  const lower = fact.toLowerCase();
  const edge = (edgeName || '').toLowerCase();

  // Destination keywords
  if (['portugal', 'spain', 'cyprus', 'thailand', 'bali', 'mexico', 'greece', 'italy', 'france', 'germany', 'dubai', 'singapore', 'japan', 'canada', 'australia', 'new zealand', 'costa rica', 'panama', 'colombia', 'argentina'].some(k => lower.includes(k))) {
    return 'destination';
  }
  // Budget keywords
  if (['budget', 'afford', 'cost', 'price', 'expensive', 'cheap', 'money', 'salary', 'income', '€', '$', '£'].some(k => lower.includes(k))) {
    return 'budget';
  }
  // Timeline keywords
  if (['months', 'years', 'soon', 'planning', 'moving', 'relocate', 'timeline', '2025', '2026', 'next year', 'summer', 'winter'].some(k => lower.includes(k))) {
    return 'timeline';
  }
  // Interest keywords
  if (['interested', 'looking for', 'wants', 'prefers', 'likes', 'love', 'enjoy'].some(k => lower.includes(k)) || edge.includes('interest')) {
    return 'interest';
  }
  // Preference keywords
  if (['prefer', 'important', 'need', 'must have', 'priority', 'climate', 'weather', 'culture'].some(k => lower.includes(k))) {
    return 'preference';
  }
  return 'fact';
}

// Clean up fact text for display
function cleanFact(fact: string): string {
  return fact
    .replace(/^(the user |user |they |he |she )/i, '')
    .replace(/^(is |are |has |have |wants |prefers )/i, '')
    .trim();
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  if (!userId || !ZEP_API_KEY) {
    return NextResponse.json({
      context: '',
      facts: [],
      entities: { destinations: [], budget: [], timeline: [], interests: [], preferences: [] }
    });
  }

  try {
    // Fetch user's memory from Zep knowledge graph
    const response = await fetch('https://api.getzep.com/api/v2/graph/search', {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${ZEP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        query: 'user relocation destination budget timeline preferences interests climate lifestyle',
        limit: 15,
        scope: 'edges',
      }),
    });

    if (!response.ok) {
      console.error('[Zep] Graph search failed:', response.status);
      return NextResponse.json({
        context: '',
        facts: [],
        entities: { destinations: [], budget: [], timeline: [], interests: [], preferences: [] }
      });
    }

    const data = await response.json();
    const edges = data.edges || [];

    // Extract and categorize facts
    const categorizedFacts: Array<{ fact: string; type: string; clean: string }> = [];
    const entities = {
      destinations: [] as string[],
      budget: [] as string[],
      timeline: [] as string[],
      interests: [] as string[],
      preferences: [] as string[],
    };

    for (const edge of edges) {
      if (!edge.fact) continue;

      const type = categorize(edge.fact, edge.name);
      const clean = cleanFact(edge.fact);

      categorizedFacts.push({ fact: edge.fact, type, clean });

      // Collect unique entities by type
      if (type === 'destination' && !entities.destinations.includes(clean)) {
        entities.destinations.push(clean);
      } else if (type === 'budget' && !entities.budget.includes(clean)) {
        entities.budget.push(clean);
      } else if (type === 'timeline' && !entities.timeline.includes(clean)) {
        entities.timeline.push(clean);
      } else if (type === 'interest' && !entities.interests.includes(clean)) {
        entities.interests.push(clean);
      } else if (type === 'preference' && !entities.preferences.includes(clean)) {
        entities.preferences.push(clean);
      }
    }

    // Build context string grouped by type
    const contextParts: string[] = [];

    if (entities.destinations.length) {
      contextParts.push(`🌍 Interested in: ${entities.destinations.join(', ')}`);
    }
    if (entities.budget.length) {
      contextParts.push(`💰 Budget: ${entities.budget.join(', ')}`);
    }
    if (entities.timeline.length) {
      contextParts.push(`📅 Timeline: ${entities.timeline.join(', ')}`);
    }
    if (entities.interests.length) {
      contextParts.push(`✨ Interests: ${entities.interests.join(', ')}`);
    }
    if (entities.preferences.length) {
      contextParts.push(`🎯 Preferences: ${entities.preferences.join(', ')}`);
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
      entities: { destinations: [], budget: [], timeline: [], interests: [], preferences: [] }
    });
  }
}
