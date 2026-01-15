'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-white/5 rounded-2xl">
      <div className="animate-pulse text-white/50">Loading visualization...</div>
    </div>
  ),
});

interface Country {
  slug: string;
  country_name: string;
  flag: string;
  region: string;
  similar_to?: string[];
}

interface CountryForceGraphProps {
  countries: Country[];
  onSelectCountry: (country: Country) => void;
  highlightedCountry?: string;
}

interface GraphNode {
  id: string;
  name: string;
  flag: string;
  region: string;
  val: number;
  color: string;
  country: Country;
}

interface GraphLink {
  source: string;
  target: string;
  strength: number;
}

const regionColors: Record<string, string> = {
  'Europe': '#8b5cf6',
  'Asia': '#f59e0b',
  'Middle East': '#10b981',
  'Caribbean': '#06b6d4',
  'Americas': '#ef4444',
  'Africa': '#ec4899',
  'Oceania': '#3b82f6',
};

// Type for the force graph node with position
type ForceGraphNodeObject = GraphNode & {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
};

export function CountryForceGraph({ countries, onSelectCountry, highlightedCountry }: CountryForceGraphProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({ nodes: [], links: [] });
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Build graph data from countries
  useEffect(() => {
    const nodes: GraphNode[] = countries.map((country) => ({
      id: country.slug,
      name: country.country_name,
      flag: country.flag,
      region: country.region,
      val: highlightedCountry === country.slug ? 25 : 15,
      color: regionColors[country.region] || '#6b7280',
      country,
    }));

    const links: GraphLink[] = [];
    const addedLinks = new Set<string>();

    countries.forEach((country) => {
      if (country.similar_to) {
        country.similar_to.forEach((similar) => {
          const similarCountry = countries.find(
            (c) => c.country_name.toLowerCase() === similar.toLowerCase() ||
                   c.slug === similar.toLowerCase()
          );
          if (similarCountry) {
            const linkId = [country.slug, similarCountry.slug].sort().join('-');
            if (!addedLinks.has(linkId)) {
              addedLinks.add(linkId);
              links.push({
                source: country.slug,
                target: similarCountry.slug,
                strength: 1,
              });
            }
          }
        });
      }
    });

    setGraphData({ nodes, links });
  }, [countries, highlightedCountry]);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: 400,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Center on highlighted country
  useEffect(() => {
    if (highlightedCountry && graphRef.current) {
      const node = graphData.nodes.find((n) => n.id === highlightedCountry);
      if (node && (node as any).x !== undefined) {
        graphRef.current.centerAt((node as any).x, (node as any).y, 1000);
        graphRef.current.zoom(2, 1000);
      }
    }
  }, [highlightedCountry, graphData.nodes]);

  const handleNodeClick = useCallback((node: ForceGraphNodeObject) => {
    onSelectCountry(node.country);
    if (graphRef.current && node.x !== undefined && node.y !== undefined) {
      graphRef.current.centerAt(node.x, node.y, 500);
      graphRef.current.zoom(2.5, 500);
    }
  }, [onSelectCountry]);

  const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.flag;
    const fontSize = 16 / globalScale;
    const isHighlighted = node.id === highlightedCountry;
    const isHovered = hoveredNode?.id === node.id;

    // Draw glow for highlighted/hovered
    if (isHighlighted || isHovered) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.val * 1.5, 0, 2 * Math.PI);
      ctx.fillStyle = isHighlighted ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.2)';
      ctx.fill();
    }

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI);
    ctx.fillStyle = node.color;
    ctx.fill();
    ctx.strokeStyle = isHighlighted ? '#fff' : 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = isHighlighted ? 3 : 1;
    ctx.stroke();

    // Draw flag emoji
    ctx.font = `${fontSize * 1.5}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, node.x, node.y);

    // Draw name on hover
    if (isHovered || isHighlighted) {
      ctx.font = `bold ${12 / globalScale}px sans-serif`;
      ctx.fillStyle = '#fff';
      ctx.fillText(node.name, node.x, node.y + node.val + 10 / globalScale);
    }
  }, [highlightedCountry, hoveredNode]);

  return (
    <div className="relative">
      <div ref={containerRef} className="w-full h-[400px] bg-gradient-to-br from-stone-900/80 to-stone-950/80 rounded-2xl overflow-hidden border border-white/10">
        {typeof window !== 'undefined' && (
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="transparent"
            nodeCanvasObject={nodeCanvasObject}
            nodePointerAreaPaint={(node: any, color, ctx) => {
              ctx.beginPath();
              ctx.arc(node.x, node.y, node.val * 1.5, 0, 2 * Math.PI);
              ctx.fillStyle = color;
              ctx.fill();
            }}
            linkColor={() => 'rgba(255, 255, 255, 0.15)'}
            linkWidth={2}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleColor={() => 'rgba(139, 92, 246, 0.8)'}
            onNodeClick={handleNodeClick as any}
            onNodeHover={(node: any) => setHoveredNode(node as GraphNode | null)}
            cooldownTicks={100}
            d3VelocityDecay={0.3}
            enableZoomInteraction={true}
            enablePanInteraction={true}
          />
        )}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
        {Object.entries(regionColors).map(([region, color]) => (
          <div key={region} className="flex items-center gap-1.5 px-2 py-1 bg-black/50 backdrop-blur rounded-full">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-white/70">{region}</span>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur rounded-lg">
        <span className="text-[10px] text-white/50">Click a country to explore • Scroll to zoom • Drag to pan</span>
      </div>

      {/* Hovered info */}
      {hoveredNode && (
        <div className="absolute top-4 left-4 px-3 py-2 bg-black/70 backdrop-blur rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{hoveredNode.flag}</span>
            <div>
              <div className="text-white font-medium text-sm">{hoveredNode.name}</div>
              <div className="text-white/50 text-xs">{hoveredNode.region}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
