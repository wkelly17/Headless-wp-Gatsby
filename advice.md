# Does it move?

Animations folder
Page Transitions file for those specifically

## Do you need access to the timeline to start it and stop it later on the page?

- Set a ref in parent; (BC refs are directly mutable and don't cause re-renders);
- Feed timeline the node (whether a true ref that is passed to child (e.g Box), or just the result of a querySelector operation) in the UseEffect Hook (with whatever needed Deps)
  - Example is in Masthead; Start and Stop Record on Button click;
- Access the timeline on the ref as needed; Pass it around if needed; E.G Sidescroller on home page

## No access Needed for timeline later

- It can pass a reference to itself inside the component; E.g. Illo sputnik;

## Page Animations:

- Get Durations by passing the node into the page Transitions with an argument to get dur back;
- Run This During UseEffect so that the Ref.current is attached to node (after initial Render)

## Data Fetching

- Do as much you can that can be static through Graphql Queries; CPTS and ACF's are supported;
- Client Side Data Fetching Queries Should be placed in the queries file; React-Query Handles these; Check the schema in WP Graphql Backend, not Gatsby source WP

## Styles:

- In this repo: mostly done through tailwind
- Base styles for things like List unstyled etc; can be written into the atoms/components itself OR left in a base sass file
-

## Extra nice=ities

- The homepage is responsive with a media query set to watch itself
- Conditional Markup with Responsive Context
- Easy Locking of Body Scroll and other commons tasks with React Use (see masthead file);
- Accessibility more easily
