import Image from 'next/image';
import Link from 'next/link';


type ServerSideProps = {
    params : {
        name:string,
    }
}


export async function getServerSideProps(props: ServerSideProps){
    console.log(props);
    const data = await fetch(`http://back:8000/getPeli/${props.params.name}`);    
    console.log(data);
    const json = await data.json();
    console.log(json);
    return {props: json.Peli};
}
type CharacterProps = {
    name : string,
    valoracion: number,
    _id: string,
    tipo: string,
    duracion: number,
    image: string,
    comentarios: string,

}

const Character = (props:CharacterProps) => {
    return(
        <>
        <Link href="/">Volver al menu principal</Link>
        <br/>
            Id: {props._id}
            <br/>

            Tipo: {props.tipo}
            <br/>

           Valoracion:  {props.valoracion}
            <br/>

            Nombre:{props.name}
            <br/>

            Duracion:{props.duracion}
            <br/>

            Imagen:<Image src={props.image} width="50" height="100" alt="Problema con fotito"/>
            <br/>

            Comentarios:{props.comentarios}
            <br/>


        </>
    );
};
export default Character;