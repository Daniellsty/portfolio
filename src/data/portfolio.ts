import { COVER_URI, type CoverId } from "../lib/covers";

export type Project = {
  id: CoverId;
  title: string;
  description: string;
  tags: string[];
  image: string;
  layout: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  hasVideo?: boolean;
};

export const profile = {
  name: "Muhammad Bilal Khan",
  email: "hello@mbilalkhan.com",
  linkedin: "https://www.linkedin.com/in/mbilalkhan",
  twitter: "https://twitter.com/mbilalkhan",
};

export const COPY = {
  heroLine1: "My Name Is Daniel lorestany ",
  heroLine2Before: "I am an",
  heroLine2Accent: "Artistic",
  heroLine2After: "Web Developer.",
  enter: "Enter",
  scrollExplore: "Scroll to Explore",
  tapProject: "To learn more, tap on a project.",
  myWork: "My Work",
  hobbiesMovies:
    "Movies and TV Shows are some of my favorite things to watch when I'm free.",
  hobbiesGames: "Games are also a part of my life.",
  phoneHint: "Use this phone to reach me :)",
  vrUnsupported: "VR NOT SUPPORTED",
} as const;

export const projects: Project[] = [
  {
    id: "island",
    title: "An Immersive Island Exploration Experience",
    description:
      "An immersive web experience where user can see different islands and interact with them. The sea is represented by a realtime water simulation driven by a GLSL shader. User can see islands up close by clicking on them. The click is followed by a smooth camera animation towards the island. The model was created in Blender.",
    tags: [
      "HTML",
      "CSS",
      "Javascript",
      "Reactjs",
      "Threejs",
      "GSAP",
      "Blender",
      "GLSL Shaders",
    ],
    image: COVER_URI.island,
    layout: { top: "6%", left: "14%", width: "28%", height: "28%" },
    hasVideo: true,
  },
  {
    id: "gems",
    title: "Crypto Gem Alliance Website",
    description:
      "This website showcases different NFT gems that Crypto Gem Alliance offers. It has an interactive 3D experience that can be run on desktops, mobile phones, and some smartwatches. Users can view different types of diamonds and check out the experience with various colors.",
    tags: [
      "HTML",
      "CSS",
      "Javascript",
      "Reactjs",
      "Threejs",
      "GSAP",
      "GLSL Shaders",
    ],
    image: COVER_URI.gems,
    layout: { top: "4%", left: "48%", width: "18%", height: "24%" },
  },
  {
    id: "home",
    title: "Smart Home Technology Experience",
    description:
      "A website offering a 360-degree experience that showcases the diverse home solutions provided by the company in an immersive manner. The website enables users to engage with the integrated technologies in the home, featuring several navigation options such as hotspots, a 3D map, a sidebar, and a filtering tool. Each navigation tool is accompanied by an information spot that furnishes detailed product information. Additionally, an admin portal has been developed to monitor user activity on the website.",
    tags: [
      "HTML",
      "CSS",
      "Javascript",
      "Reactjs",
      "Threejs",
      "React Three Fiber",
      "Blender",
      "GSAP",
    ],
    image: COVER_URI.home,
    layout: { top: "38%", left: "10%", width: "30%", height: "26%" },
  },
  {
    id: "store",
    title: "Retail Store Explorer",
    description:
      "An immersive retail experience where users explore a 3D store layout, view product details through information spots, and navigate via an interactive 3D map.",
    tags: ["HTML", "CSS", "Javascript", "Threejs", "GSAP"],
    image: COVER_URI.store,
    layout: { top: "32%", left: "68%", width: "18%", height: "22%" },
  },
  {
    id: "character",
    title: "Image Cluster Experience",
    description:
      "An immersive WebGL-based image cluster experience for an event presentation. Users can explore it by looking around and scrolling. The images fade in when they are at a certain distance from the user and fade out when they are very close.",
    tags: ["HTML", "CSS", "Javascript", "Threejs", "WebGL"],
    image: COVER_URI.character,
    layout: { top: "68%", left: "22%", width: "16%", height: "20%" },
  },
  {
    id: "football",
    title: "Web-based American Football Game",
    description:
      "This game was for playable web ads. It featured a pleasant 3D environment and real-time physics simulation. With all the assets, 3D models, code, and libraries, the game was very well optimized. The total size is just 1.9 MB.",
    tags: ["HTML", "CSS", "Javascript", "Threejs", "Blender"],
    image: COVER_URI.football,
    layout: { top: "60%", left: "44%", width: "22%", height: "24%" },
  },
  {
    id: "globe",
    title: "Animal Globe",
    description:
      "A 3D interactive web application with 44,000 interactive hexagons. Implemented features for virtual Earth exploration, accessing country-specific animal and charity information.",
    tags: ["HTML", "CSS", "Javascript", "Reactjs", "Threejs", "WebGL"],
    image: COVER_URI.globe,
    layout: { top: "18%", left: "70%", width: "16%", height: "16%" },
  },
  {
    id: "office",
    title: "Kaariku Sports Center Website 3D Experience",
    description:
      "Using Three.js, I have created an immersive 3D experience where users can freely explore every part of the sports center. From indoor sports halls to outdoor fields and a swimming pool, the website allows visitors to navigate the entire facility.",
    tags: ["HTML", "CSS", "Javascript", "Reactjs", "Threejs", "Blender"],
    image: COVER_URI.office,
    layout: { top: "52%", left: "46%", width: "20%", height: "14%" },
  },
];

export const PROJECT_IMAGES = projects.map((project) => project.image);
