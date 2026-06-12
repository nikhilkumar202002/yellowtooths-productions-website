export type BrandingProject = {
  slug: string;
  featuredImage: string;
  heading: string;
  description: string;
  gallery: string[];
};

const createGallery = (
  folder: string,
  filePrefix: string,
  imageCount: number,
) =>
  Array.from(
    { length: imageCount },
    (_, index) =>
      `/branding/${folder}/${filePrefix}${String(index + 1).padStart(2, "0")}.webp`,
  );

const createProject = ({
  slug,
  folder,
  filePrefix,
  imageCount,
  heading,
  description,
}: {
  slug: string;
  folder: string;
  filePrefix: string;
  imageCount: number;
  heading: string;
  description: string;
}): BrandingProject => {
  const gallery = createGallery(folder, filePrefix, imageCount);

  return {
    slug,
    featuredImage: gallery[0],
    heading,
    description,
    gallery,
  };
};

export const brandingProjects: BrandingProject[] = [
  createProject({
    slug: "cubes",
    folder: "cubes",
    filePrefix: "Cubes branding Posters-",
    imageCount: 12,
    heading: "Cubes",
    description:
      "A bold and modular identity system built around geometric forms, confident typography, and a flexible visual language.",
  }),
  createProject({
    slug: "fashion-opticals",
    folder: "fashion-opticals",
    filePrefix: "FASHION OPTICALS LOGO FINAL APPROVED-",
    imageCount: 21,
    heading: "Fashion Opticals",
    description:
      "A refined optical brand identity balancing contemporary fashion cues with clarity, precision, and everyday accessibility.",
  }),
  createProject({
    slug: "gaa",
    folder: "gaa",
    filePrefix: "GAA-",
    imageCount: 16,
    heading: "Global Academy of Artistry",
    description:
      "An expressive education brand system designed to celebrate artistic growth, creative confidence, and emerging talent.",
  }),
  createProject({
    slug: "junga",
    folder: "junga",
    filePrefix: "Junga Branding Poster-",
    imageCount: 15,
    heading: "Junga",
    description:
      "A vibrant identity with a playful visual rhythm, distinctive graphic elements, and an energetic brand personality.",
  }),
  createProject({
    slug: "malayoram",
    folder: "malayoram",
    filePrefix: "Malayoram Branding Posters-",
    imageCount: 22,
    heading: "Malayoram",
    description:
      "A rooted visual identity that brings regional character, warmth, and a contemporary design sensibility together.",
  }),
  createProject({
    slug: "meduselle",
    folder: "meduselle",
    filePrefix: "meduselle-",
    imageCount: 19,
    heading: "Meduselle",
    description:
      "An elegant identity system shaped by fluid forms, considered typography, and a sophisticated visual atmosphere.",
  }),
  createProject({
    slug: "tata",
    folder: "tata",
    filePrefix: "TATA Branding Poster -",
    imageCount: 12,
    heading: "TATA",
    description:
      "A structured brand exploration focused on clear communication, consistent applications, and a strong visual presence.",
  }),
  createProject({
    slug: "tejas",
    folder: "tejas",
    filePrefix: "Tejas Branding Poster -",
    imageCount: 15,
    heading: "Tejas",
    description:
      "A confident identity combining sharp graphic decisions with a versatile system for print and digital communication.",
  }),
  createProject({
    slug: "tpr",
    folder: "tpr",
    filePrefix: "TPR Branding Poster -",
    imageCount: 12,
    heading: "TPR",
    description:
      "A focused visual system developed for recognition, consistency, and flexible use across essential brand touchpoints.",
  }),
  createProject({
    slug: "vacastay",
    folder: "vacasty",
    filePrefix: "Vacastay Branding Poster-",
    imageCount: 10,
    heading: "Vacastay",
    description:
      "A welcoming hospitality identity designed around memorable stays, relaxed experiences, and a warm visual character.",
  }),
  createProject({
    slug: "viscara",
    folder: "viscara",
    filePrefix: "viscara-",
    imageCount: 34,
    heading: "Viscara",
    description:
      "A comprehensive identity system combining expressive art direction, polished applications, and a distinctive modern voice.",
  }),
];

export const getBrandingProject = (slug: string) =>
  brandingProjects.find((project) => project.slug === slug);
