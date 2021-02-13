import { useState } from "react";

import { Box, Button, Image, Header, Text } from "grommet";

import { Menu } from "grommet-icons";

import Link from "next/link";
import logo from "../public/img/expatriant_logo.png";
import MobileNavMenu from "./MobileNavMenu";

import style from "../public/styles/Navbar.module.css";

import React from "react";

export default function Navbar({ size }) {
  const [mobileOpen, toggleMobileMenu] = useState(false);
  const responsiveNav =
    size !== "small" ? (
      <Header
        elevation="small"
        direction="row"
        justify="evenly"
        align="center"
        height={size === "small" ? "50px" : "80px"}
      >
        <Link href="/">
          <Box
            height={size === "small" ? "50px" : "75px"}
            width={size === "small" ? "50px" : "75px"}
            margin={{ right: "15px" }}
          >
            <Image fit="cover" src={logo} />
          </Box>
        </Link>
        <Box fill="vertical" direction="row">
          <ul className={style.ListFormat}>
            <li className={style.UnderlineAnimation}>
              <Link href="/">
                <Box
                  fill="vertical"
                  justify="center"
                  pad={{ left: "15px", right: "15px" }}
                >
                  <Text
                    className={style.NavLink}
                    size={size === "small" ? "12px" : "14px"}
                    color="black"
                  >
                    Jobs
                  </Text>
                </Box>
              </Link>
            </li>
            <li className={style.UnderlineAnimation}>
              <a
                className={style.NavAnchorTag}
                href="https://expatriant.com/russia/residency/"
              >
                <Box
                  fill="vertical"
                  justify="center"
                  pad={{ left: "15px", right: "15px" }}
                >
                  <Text
                    className={style.NavLink}
                    size={size === "small" ? "12px" : "14px"}
                    color="black"
                  >
                    Residency
                  </Text>
                </Box>
              </a>
            </li>
            <li className={style.UnderlineAnimation}>
              <a
                className={style.NavAnchorTag}
                href="https://expatriant.com/russia/residency/"
              >
                <Box
                  fill="vertical"
                  justify="center"
                  pad={{ left: "15px", right: "15px" }}
                >
                  <Text
                    className={style.NavLink}
                    size={size === "small" ? "12px" : "14px"}
                    color="black"
                  >
                    About Us
                  </Text>
                </Box>
              </a>
            </li>
            <li className={style.ActiveTab}>
              <a
                className={style.NavAnchorTag}
                href="https://expatriant.com/contact/"
              >
                <Box
                  fill="vertical"
                  justify="center"
                  pad={{ left: "15px", right: "15px" }}
                >
                  <Text
                    className={style.NavLink}
                    size={size === "small" ? "12px" : "14px"}
                    color="black"
                  >
                    Contact
                  </Text>
                </Box>
              </a>
            </li>
          </ul>
        </Box>
      </Header>
    ) : (
      <>
        <Header elevation="small" height="55px">
          <Box
            fill={true}
            gap="xlarge"
            direction="row"
            align="center"
            justify="between"
            margin={{ left: "15px", right: "15px" }}
          >
            <Box
              width="35px"
              height="35px"
              align="center"
              justify="center"
              onClick={() => {
                toggleMobileMenu(true);
              }}
            >
              <Menu size="26px" color="brand" />
            </Box>
            <Link href="/">
              <Box height="48px" width="48px">
                <Image fit="cover" src={logo} />
              </Box>
            </Link>

            <Box width="35px" height="35px" align="center" justify="center" />
          </Box>
        </Header>
        {mobileOpen && (
          <MobileNavMenu
            mobileOpen={mobileOpen}
            toggleMobileMenu={toggleMobileMenu}
            size={size}
          />
        )}
      </>
    );
  return responsiveNav;
}
