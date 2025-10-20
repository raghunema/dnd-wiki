import { useEffect, useState, useRef } from 'react';
import { getRelations, getAllNpcs } from '../../../backendCalls/api';
import * as d3 from "d3";

const RelationGraph = () => {
  const svgRef = useRef();
  const [allRelations, setAllRelations] = useState([]);
  const [allNpcs, setAllNpcs] = useState([]);

  // Fetch data on mount
  useEffect(() => {
    const getAndSetAllRelations = async () => {
      try {
        const relations = await getRelations();
        const allNpc = await getAllNpcs({
          fields: ['slug', 'name'],
          expand: []
        });
        setAllRelations(relations);
        setAllNpcs(allNpc);
        console.log(relations);
        console.log(allNpc);
      } catch (err) {
        console.error(err);
      }
    };
    getAndSetAllRelations();
  }, []);

  // Create and update graph
  useEffect(() => {
    if (!allNpcs.length || !allRelations.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current)
      .attr("width", 800)
      .attr("height", 800);

    // Clear previous content
    svg.selectAll("*").remove();

    // Create nodes with proper id extraction
    const nodes = allNpcs.map(d => ({ 
      ...d, 
      id: d._id
    }));

    // Create links with source/target mapped to node IDs
    const links = allRelations.map(d => ({ 
      ...d,
      source: d.npcA,
      target: d.npcB
    }));

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(800 / 2, 800 / 2))
      .force("collision", d3.forceCollide().radius(50));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node");

    node.append("circle")
      .attr("r", 20)
      .attr("fill", "#69b3a2")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("cursor", "pointer");

    node.append("text")
      .attr("dy", 35)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .attr("pointer-events", "none")
      .style("text-shadow", "1px 1px 2px rgba(255,255,255,0.8)")
      .text(d => d.name);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [allNpcs, allRelations]);

  return (
    <div>
      <h1>In Relation Graph</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default RelationGraph;