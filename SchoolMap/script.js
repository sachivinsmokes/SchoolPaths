// 1. Define your school map as a Graph
// The numbers represent the distance or "cost" to travel between points.
const schoolMap = {
  'Gate': { 'Library': 50, 'Cafeteria': 80 },
  'Library': { 'Gate': 50, 'Main Hall': 30, 'Cafeteria': 40 },
  'Cafeteria': { 'Gate': 80, 'Library': 40, 'Gym': 60 },
  'Main Hall': { 'Library': 30, 'Gym': 20 },
  'Gym': { 'Cafeteria': 60, 'Main Hall': 20 }
};

// 2. The Pathfinding Function
function findShortestPath(graph, startNode, endNode) {
  let distances = {};
  let parents = {};
  let visited = new Set();

  // Setup initial state
  for (let node in graph) {
    distances[node] = Infinity;
    parents[node] = null;
  }
  distances[startNode] = 0;

  // Find the unvisited node with the lowest distance
  function getLowestDistanceNode(distances, visited) {
    let lowest = null;
    for (let node in distances) {
      if (!visited.has(node)) {
        if (lowest === null || distances[node] < distances[lowest]) {
          lowest = node;
        }
      }
    }
    return lowest;
  }

  let currentNode = getLowestDistanceNode(distances, visited);

  // Main algorithm loop
  while (currentNode !== null) {
    let distance = distances[currentNode];
    let neighbors = graph[currentNode];

    for (let neighbor in neighbors) {
      let newDistance = distance + neighbors[neighbor];
      // If we found a shorter path to the neighbor, update it
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        parents[neighbor] = currentNode;
      }
    }
    
    visited.add(currentNode);
    currentNode = getLowestDistanceNode(distances, visited);
  }

  // 3. Trace back the path from end to start
  let path = [];
  let currentStep = endNode;

  while (currentStep !== null) {
    path.unshift(currentStep); // Add to the beginning of the array
    currentStep = parents[currentStep];
  }

  // If the start node isn't in the path, it means no path exists
  if (path[0] !== startNode) {
      return { distance: Infinity, path: ["No path found"] };
  }

  return {
    distance: distances[endNode],
    path: path
  };
}

// --- TEST IT OUT ---
const result = findShortestPath(schoolMap, 'Gate', 'Gym');

console.log(`Total Distance: ${result.distance} meters`);
console.log(`Steps to take: ${result.path.join(' -> ')}`);