import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ianchayaLogo from "../ianchaya-logo-new.svg"



function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [t, i18n] = useTranslation("global");

  const pages = [
    { label: t("pages.education"), link: "/portfolio-ianchaya/Education" },
    { label: t("pages.work-experiences"), link: "/portfolio-ianchaya/Experiences" },
    { label: t("pages.skills"), link: "/portfolio-ianchaya/Skills" },
    { label: t("pages.projects"), link: "/portfolio-ianchaya/Projects" },
    { label: t("pages.contact"), link: "/portfolio-ianchaya/Contact" },
  ];

  const languages = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogoClick = () => {
    handleCloseNavMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChangeLng = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  return (
    <AppBar style={{ margin: 0 }} position="sticky" sx={{ bgcolor: "#0069cc" }}>
      <Container maxWidth="100%" margin="0">
        <Toolbar disableGutters>
          <Button className="container-logo-ianchaya" spacing={1} onClick={handleLogoClick} sx={{ my: 0.5, color: "white", alignItems: "center", display: { xs: "none", sm:"flex", md: "flex", xl:"flex"  }}}>
            <Link style={{ textDecoration: "none" }} to={"/portfolio-ianchaya/"}>
              <img
                class="ian-chaya"
                src={ianchayaLogo}
                alt="IanChaya"
                onClick={handleLogoClick}
                sx={{ my: 2, color: "white", display: "block", height: "499" }}
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
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none", textDecoration: "none", width:"100%" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.link} onClick={handleCloseNavMenu} textDecoration="none">
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
              <Button key={page.link} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                <Link style={{ textDecoration: "none", color: "white" }} className="categories" to={page.link}>
                  {page.label}
                </Link>
              </Button>
            ))}
          </Box>
          <Button className="container-logo-ianchaya" spacing={1} onClick={handleLogoClick} sx={{ my: 0.5, color: "white", alignItems: "center", display: { xs: "flex", sm:"none", md: "none", xl:"none"  }}}>
            <Link style={{ textDecoration: "none" }} to={"/portfolio-ianchaya/"}>
              <img
                class="ian-chaya"
                src={ianchayaLogo}
                alt="IanChaya"
                onClick={handleLogoClick}
                sx={{ my: 2, color: "white", display: "block", height: "499" }}
              />
            </Link>
          </Button>
          <Box
            component="nav"
            aria-label="Language"
            sx={{
              flexGrow: 0,
              marginLeft: 2,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: 2,
              px: 0.5,
            }}
          >
            {languages.map((lang, idx) => (
              <React.Fragment key={lang.code}>
                {idx > 0 && (
                  <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }} aria-hidden="true">
                    |
                  </Typography>
                )}
                <Button
                  onClick={() => handleChangeLng(lang.code)}
                  aria-current={i18n.language === lang.code ? "true" : undefined}
                  sx={{
                    minWidth: "auto",
                    px: 1,
                    py: 0.5,
                    fontSize: "0.875rem",
                    color: "white",
                    fontWeight: i18n.language === lang.code ? 700 : 400,
                    opacity: i18n.language === lang.code ? 1 : 0.6,
                    "&:hover": { opacity: 1, bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  {lang.label}
                </Button>
              </React.Fragment>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
