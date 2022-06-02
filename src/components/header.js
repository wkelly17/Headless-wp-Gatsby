import * as React from "react"
import { Menu, X } from "react-feather"
import {
  Container,
  Flex,
  FlexList,
  Space,
  NavLink,
  Button,
  InteractiveIcon,
  Nudge,
  VisuallyHidden,
} from "./ui"
import BrandLogo from "./brand-logo"

const data = {
  navItems: [
    {
      id: 0,
      navItemType: "Link",
      href: "/products",
      text: "Products",
    },
    {
      id: 1,
      navItemType: "Link",
      href: "/pricing",
      text: "Pricing",
    },
    {
      id: 2,
      navItemType: "Link",
      href: "/about",
      text: "About",
    },
    {
      id: 3,
      navItemType: "Link",
      href: "/Blog",
      text: "Blog",
    },
  ],
  cta: {
    href: "#!",
    text: "Sign Up",
  },
}

export default function Header() {
  const { navItems, cta } = data
  const [isOpen, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "visible"
    }
  }, [isOpen])

  return (
    <header>
      <Container className={""}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <NavLink to="/">
            <VisuallyHidden>Home</VisuallyHidden>
            <BrandLogo />
          </NavLink>
          <nav>
            <FlexList gap={4}>
              {navItems &&
                navItems.map((navItem) => (
                  <li key={navItem.id}>
                    <NavLink to={navItem.href}>{navItem.text}</NavLink>
                  </li>
                ))}
            </FlexList>
          </nav>
          <div>{cta && <Button to={cta.href}>{cta.text}</Button>}</div>
        </Flex>
      </Container>
      <Container className={""}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <span className={""}>
            <NavLink to="/">
              <VisuallyHidden>Home</VisuallyHidden>
              <BrandLogo />
            </NavLink>
          </span>
          <Flex>
            <Space />
            <div>
              {cta && (
                <Button to={cta.href} variant={isOpen ? "reversed" : "primary"}>
                  {cta.text}
                </Button>
              )}
            </div>
            <Nudge right={3}>
              <InteractiveIcon
                title="Toggle menu"
                onClick={() => setOpen(!isOpen)}
                className={""}
              >
                {isOpen ? <X /> : <Menu />}
              </InteractiveIcon>
            </Nudge>
          </Flex>
        </Flex>
      </Container>
      {isOpen && (
        <div className={""}>
          <nav>
            <FlexList responsive variant="stretch">
              {navItems?.map((navItem) => (
                <li key={navItem.id}>
                  <NavLink to={navItem.href} className={""}>
                    {navItem.text}
                  </NavLink>
                </li>
              ))}
            </FlexList>
          </nav>
        </div>
      )}
    </header>
  )
}

// example component level data fetching:
// export const query = graphql`
//   fragment AboutHeroContent on AboutHero {
//     id
//     heading
//     text
//     image {
//       id
//       gatsbyImageData
//       alt
//     }
//   }
// `
