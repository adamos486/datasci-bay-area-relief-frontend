import React, {useContext, useEffect, useState} from "react";
import {StyledComponent} from "styled-components";
import {Link, useLocation} from "react-router-dom";
import {ReactComponent as Logo} from "../assets/Logo.svg";

import {FilterBar} from "./results/FilterBar";

import MatMenu from "@mui/material/Menu";
import MatMenuItem from "@mui/material/MenuItem";
import MatButton from "@mui/material/Button";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import {GlobalStateContext} from "../context/globalStates";
import {grabCurrentFiltersFromURLParams} from "../util/historyHelper";
import {
  FilterContainer,
  HiddenContainer,
  LogoWrapper,
  Menu,
  MenuItem,
  SmallMenuContainer,
  TransparentContainer,
  WhiteContainer,
  MenuItemTypography
} from "./Header.styles";

const Header: React.FC = () => {
  const {setIsFilterOpen, setCurrentFilters} = useContext(GlobalStateContext);

  const location = useLocation();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isResultsPage, setIsResultsPage] = useState(false);
  const [filterToggle, setFilterToggle] = React.useState(false);

  useEffect(
    () => {
      if (location.search) {
        setCurrentFilters(grabCurrentFiltersFromURLParams(location));
      }
    },
    [setCurrentFilters, location]
  );

  // Update isResultsPage when location pathname changes;
  useEffect(
    () => {
      setIsResultsPage(location.pathname === "/results");
    },
    [location.pathname]
  );

  // Handle navbar layout when scrolling
  useEffect(
    () => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const isVisible = prevScrollPos > currentScrollPos;

        setPrevScrollPos(currentScrollPos);
        setVisible(isVisible);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    },
    [prevScrollPos]
  );

  // Track window width to toggle FilterBarOpen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 752) {
        // setIsFilterOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let Container: StyledComponent<"header", React.FC>;

  // Change navbar layout when in home page and results page. Home page is clear and results page navbar is white
  if (location.pathname === "/results" || location.pathname === "/donate") {
    Container = WhiteContainer;
  } else {
    if (prevScrollPos > 0)
      Container = visible ? WhiteContainer : HiddenContainer;
    else Container = visible ? TransparentContainer : HiddenContainer;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (event.type === "keydown") {
      return;
    }
    setIsFilterOpen(open);
    setFilterToggle(open);
  };

  const SmallMenu = () => (
    <SmallMenuContainer id="small-menu-container">
      <MatButton
        id="mat-button"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </MatButton>

      <MatMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MatMenuItem component={Link} to="/" onClick={handleClose}>
          Home
        </MatMenuItem>
        <MatMenuItem component={Link} to="/results" onClick={handleClose}>
          Search
        </MatMenuItem>
        <MatMenuItem
          component={Link}
          to={{
            pathname: "/",
            search: "",
            hash: "#about",
            state: {toAbout: true}
          }}
          onClick={handleClose}
        >
          About
        </MatMenuItem>
        <MatMenuItem component={Link} to="/donate" onClick={handleClose}>
          Donate
        </MatMenuItem>
      </MatMenu>
    </SmallMenuContainer>
  );

  return (
    <Container>
      <LogoWrapper>
        <Logo role="logo" />
      </LogoWrapper>
      {isResultsPage && (
        <FilterContainer>
          <Button onClick={toggleDrawer(true)}>{"filter"}</Button>
          <Drawer
            anchor={"left"}
            open={filterToggle}
            onClose={toggleDrawer(false)}
          >
            <div
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
              style={{width: "400 px"}}
            >
              <FilterBar />
            </div>
          </Drawer>
        </FilterContainer>
      )}
      <Menu role="menu">
        {SmallMenu()}
        <MenuItem
          to={{
            pathname: "/",
            search: "",
            hash: "",
            state: {toHome: true}
          }}
        >
          <MenuItemTypography variant="body1">Home</MenuItemTypography>
        </MenuItem>
        <MenuItem to="/results">
          <MenuItemTypography variant="body1">Search</MenuItemTypography>
        </MenuItem>
        <MenuItem
          to={{
            pathname: "/",
            search: "",
            hash: "#about",
            state: {toAbout: true}
          }}
        >
          <MenuItemTypography variant="body1">About</MenuItemTypography>
        </MenuItem>
        <MenuItem to="/donate">
          <MenuItemTypography variant="body1">Donate</MenuItemTypography>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Header;
