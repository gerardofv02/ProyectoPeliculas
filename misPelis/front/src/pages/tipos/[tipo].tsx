import { Pelicula, Peliculas } from '@/styles/styledComponents';
import Image from 'next/image';
import Link from 'next/link';


type ServerSideProps = {
    params : {
        tipo:string,
    }
}


export async function getServerSideProps(props: ServerSideProps){
    console.log(props.params.tipo);
    const data = await fetch(`http://back:8000/getPelisTipos/${props.params.tipo}`);    
    console.log(data);
    const json = await data.json();
    console.log(json);
    return {props: {
        peliculas: json.peliDB
    }};
}
type PelisProps = {   
    peliculas:{
        name : string,
        valoracion: number,
        _id: string,
        tipo: string,
        duracion: number,
        image: string,
        comentarios: string,
    }[]
}

const Character = (props:PelisProps) => {
    return(
        <>
        <br/>
        <Link href="/">Volver al menu principal</Link>
        <br/>
     Peliculas: 
      <br/>
      <Peliculas>
      { props.peliculas!.map((peli) => {
        console.log(peli);
        return(
        <Pelicula key={peli._id}> 
        Nombre: <Link href={`/pelicula/${peli.name}`}>{peli.name}</Link> 
        <br/>
        Imagen: <Image src={peli.image!} alt="Problema con foto" width="100" height="200"/> <br/>
        </Pelicula>)
      })}
      </Peliculas>


        </>
    );
};
export default Character;