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

    const width = 1000;
    const height = 1000;
    const nodeRadius = 20;
    const padding = 30;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

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
      .force("link", d3.forceLink(links).id(d => d.id).distance(50))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(800 / 2, 800 / 2))
      .force("collision", d3.forceCollide().radius(30));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#949090ff")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(d3.drag()
                .on("start", dragStarted)
                .on("drag", dragged)
                .on("end", dragEnded));

    function dragStarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragEnded(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    node.append("circle")
      .attr("r", 10)
      .attr("fill", "#e09a0e")
      .attr("stroke", "#d5a646ff")
      .attr("stroke-width", 2)
      .attr("cursor", "pointer");

    node.append("text")
      .attr("dy", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "8px")
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

        nodes.forEach(d => {
            d.x = Math.max(nodeRadius, Math.min(width - nodeRadius - padding, d.x));
            d.y = Math.max(nodeRadius, Math.min(height - nodeRadius - padding, d.y));
        });

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