API
    [ERail](https://erail.in/rail/getTrains.aspx)
    [ERail Implement](https://github.com/AniCrad/indian-rail-api)
    [Anicrad/Indian-rail](https://github.com/AniCrad/indian-rail)
    [Metro Data](https://themetrorailguy.com/kolkata-metro-information-map-updates/)
    [Backend Url](https://indian-rail-api.onrender.com/)

Authorization (Register and login)
    Clerk

Points to be noted:
    We need to maintain some intersection points of different routes to connect them
    Need to create Kolkata Metro Dataset
    Need To create a list of api routes
    NEED TO CHECK A* ALGORITHM
    ALSO DIJKSTRA

*Maybe Useful
>The A* algorithm is a popular pathfinding algorithm used for finding the shortest path between nodes in a graph, such as in a map. It's an extension of Dijkstra's algorithm with a heuristic to improve performance. Here's a high-level overview of how the A* algorithm works:

1. **Initialize**: 
   - Initialize two lists: an open list and a closed list.
   - Add the starting node to the open list.

2. **Loop**:
   - While the open list is not empty, do the following:
     - Select the node from the open list with the lowest f cost, where f(n) = g(n) + h(n). Here, g(n) is the cost of the path from the start node to node n, and h(n) is the heuristic estimate of the cost from node n to the goal.
     - Remove the selected node from the open list and add it to the closed list.
     - If the selected node is the goal node, the algorithm terminates.
     - Otherwise, for each neighbor of the current node:
       - If the neighbor is not walkable or is in the closed list, skip it.
       - If the neighbor is not in the open list, compute its g and h costs and add it to the open list.
       - If the neighbor is in the open list and the new g cost is lower than its previous g cost, update its g cost and parent node.

3. **Construct Path**:
   - Once the goal node is reached, trace back through the parent nodes from the goal node to the start node to reconstruct the shortest path.

A* algorithm combines the advantages of both Dijkstra's algorithm (finding the shortest path) and greedy best-first search (using heuristics to guide the search). The efficiency and accuracy of A* largely depend on the quality of the heuristic function used.

Here's a Python example implementing the A* algorithm for finding the shortest path on a map:

```python
def astar(graph, start, goal):
    open_set = {start}
    came_from = {}
    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}

    while open_set:
        current = min(open_set, key=lambda x: f_score[x])
        if current == goal:
            return reconstruct_path(came_from, goal)

        open_set.remove(current)
        for neighbor in graph[current]:
            tentative_g_score = g_score[current] + graph[current][neighbor]
            if neighbor not in g_score or tentative_g_score < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = g_score[neighbor] + heuristic(neighbor, goal)
                if neighbor not in open_set:
                    open_set.add(neighbor)

    return None

def reconstruct_path(came_from, current):
    path = [current]
    while current in came_from:
        current = came_from[current]
        path.append(current)
    path.reverse()
    return path

def heuristic(node, goal):
    # Example Euclidean distance heuristic
    return ((node[0] - goal[0]) ** 2 + (node[1] - goal[1]) ** 2) ** 0.5

# Example graph representation (dictionary of dictionaries)
graph = {
    (0, 0): {(0, 1): 1, (1, 0): 1},
    (0, 1): {(0, 0): 1, (0, 2): 1},
    (0, 2): {(0, 1): 1, (1, 2): 1},
    (1, 0): {(0, 0): 1, (1, 1): 1},
    (1, 1): {(1, 0): 1, (0, 1): 1, (1, 2): 1},
    (1, 2): {(1, 1): 1, (0, 2): 1}
}

start = (0, 0)
goal = (1, 2)

print(astar(graph, start, goal))
```

This is a basic implementation and can be further optimized or extended based on specific requirements and constraints. Additionally, you need to define the graph and heuristic function according to your map representation and domain.


Station Schema:  {
    station_name:""
    station_code:""
    line_color_code:""
    <!-- undirected graph -->
    connected_metro_stations:[array of multiple station_id adjacent to itself] 
    connected_railway_stations:[array of multiple station_id adjacent to itself] 
}

route:{
    source:""
    destination:""
    distance:""
    intermidiate_stations:[]
    fare:""
    begin_time:""
    ending_time:""
    current_time:""
}


ADD CACHING MECHANISM TO SPEED UP SOURCE TO DESTINATION SEARCH WHEN SOURCE IS SAME


react-jwt
chakra-ui / setup
redux

