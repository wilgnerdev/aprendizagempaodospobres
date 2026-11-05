import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect, useLayoutEffect } from "react"

import Header from "./site/components/Header/Header"
import Home from "./site/pages/Home/Home.jsx"
import CursoDetalhes from "./site/pages/CursoDetalhes/CursoDetalhes.jsx"
import Footer from "./site/components/Footer/Footer"
import FaqPage from "./site/pages/FaqPage/FaqPage.jsx"
import FormPage from './site/pages/Form/Form.jsx'
import { getCursoPorId } from "./site/data/cursos"
import BackToTop from "./site/components/BackToTop/BackToTop.jsx"

const tituloPadrao = "Aprendizagem Profissional | Pão dos Pobres"

function AtualizarTitulo() {
  const { pathname } = useLocation()

  useEffect(() => {
    let titulo = tituloPadrao

    if (pathname === "/faq") {
      titulo = "Perguntas frequentes | Pão dos Pobres"
    } else if (pathname === "/inscricao") {
      titulo = "Inscrição | Pão dos Pobres"
    } else {
      const cursoMatch = pathname.match(/^\/cursos\/([^/]+)\/?$/)

      if (cursoMatch) {
        const curso = getCursoPorId(cursoMatch[1])
        titulo = curso
          ? `${curso.titulo} | Pão dos Pobres`
          : "Curso não encontrado | Pão dos Pobres"
      }
    }

    document.title = titulo
  }, [pathname])

  return null
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null
}

function App() {
  return (
    <BrowserRouter>
      <AtualizarTitulo />
      <ScrollToTop />
      { <Header /> }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos/:id" element={<CursoDetalhes />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/inscricao" element={<FormPage />} />
      </Routes>

      { <Footer /> }
      { <BackToTop /> }
    </BrowserRouter>
  )
}

export default App
