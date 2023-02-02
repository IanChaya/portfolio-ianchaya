import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [t, i18n] = useTranslation("global");

  const pages = [
    { label: t("pages.education"), link: "/Education" },
    { label: t("pages.work-experiences"), link: "/Experiences" },
    { label: t("pages.skills"), link: "/Skills" },
    { label: t("pages.projects"), link: "/Projects" },
    { label: t("pages.contact"), link: "/Contact" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleChangeLng = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#0069cc" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <img
                class="ian-chaya"
                src="../ianchaya5.png"
                alt="IanChaya"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block", height: "500" }}
              />
            </Link>
          </Button>
          {/* Tipografia y estilos lista Navbar */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* Menu hamburguesa */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              textDecoration="none"
            >
              <MenuIcon />
            </IconButton>
            {/* Funcionamiento del desplegable del menu hamburguesa */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none", textDecoration: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} textDecoration="none">
                  <Typography textAlign="center" className="categories">
                    <Link style={{ textDecoration: "none", color: "black" }} to={page.link}>
                      {page.label}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Categorias en pantalla PC */}
            {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                <Link style={{ textDecoration: "none", color: "white" }} className="categories" to={page.link}>
                  {page.label}
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Grid container spacing={0}>
              <Grid item xs={4} sm={4} md={4} xl={4}>
                <Link>
                  <Button onClick={() => handleChangeLng("es")} sx={{ my: 2, color: "white" }}>
                    <img
                      class="flag"
                      src="../argentina-64.png"
                      alt="bandera argentina"
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white" }}
                    />
                    <Typography sx={{ my: 2, color: "white" }}> </Typography>
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4} sm={4} md={4} xl={4}>
                <Link>
                  <Button onClick={() => handleChangeLng("en")} sx={{ my: 2, color: "white" }}>
                    <img
                      class="flag"
                      src="../united states-64.png"
                      alt="bandera eeuu"
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white" }}
                    />
                    <Typography sx={{ my: 2, color: "white" }}> </Typography>
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4} sm={4} md={4} xl={4}>
                <Link>
                  <Button onClick={() => handleChangeLng("fr")} sx={{ my: 2, color: "white" }}>
                    <img
                      class="flag"
                      src="../france-64.png"
                      alt="bandera francia"
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "inline" }}
                    />
                    <Typography sx={{ my: 2, color: "white" }}> </Typography>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
