// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";



const date = new Date().getFullYear();

export default {
  brand: {
    name: "Material Kit 2",
    image: brand,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/techpro.com.vn/",
    },
    // {
    //   icon: <TwitterIcon />,
    //   link: "https://twitter.com/creativetim",
    // },
    // {
    //   icon: <GitHubIcon />,
    //   link: "https://github.com/creativetimofficial",
    // },
    {
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/user/TechproIAGChannel",
    },
  ],
  menus: [
    {
      name: "company",
      items: [
        { name: "about us", href: "https://www.creative-tim.com/presentation" },
        {
          name: "freebies",
          href: "https://www.creative-tim.com/templates/free",
        },
        {
          name: "premium tools",
          href: "https://www.creative-tim.com/templates/premium",
        },
        { name: "blog", href: "https://www.creative-tim.com/blog" },
      ],
    },

    {
      name: "help & support",
      items: [
        { name: "contact us", href: "https://www.creative-tim.com/contact-us" },
        {
          name: "knowledge center",
          href: "https://www.creative-tim.com/knowledge-center",
        },
        {
          name: "custom development",
          href: "https://services.creative-tim.com/",
        },
        {
          name: "sponsorships",
          href: "https://www.creative-tim.com/sponsorships",
        },
      ],
    },
  ],
 
};
