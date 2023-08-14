import styled from "styled-components";

//Aqui se encuentra el codigo que deja bonita la pagina

export const Peliculas = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 3px solid black;
  text-align: center;
  margin-top: 2rem;
  width: 100%;
  height: 100%;
  background-color: #FABADA;
  margin-bottom: 2%;
  
`;

export const Formulario = styled.div`
    margin-top: 2rem;
    background-color: aqua;
`

export const Pelicula = styled.div`
    display : flex;
    align-items: center;
    justify-content: center ;
    border: 1px solid black;
    flex-direction: column;
`

export const Busqueda = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  border: 3px solid black;
  text-align: center;
  margin-top: 2rem;
  width: 100%;
  height: 100%;
  background-color: #AAAAAA;
  margin-bottom: 2%;

`