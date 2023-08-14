import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Formulario, Pelicula, Peliculas,Busqueda } from "@/styles/styledComponents";
//IMPORTANTE: SI DA ERROR POR DOMINIO IR AL ARCHIVO next.config.js

//Tipo pelicula donde se contiene los atributos de la pelicula
type pelicula = {

  name: string,
  tipo: string,
  valoracion: number,
  image: string,
  _id:string,
  duracion: number,
  comentarios: string,
  plataforma: string
}


//Pagina principal donde estan todas las peliculas y para agregar pelicula y buscar por tipos
const Tabla = () => {
  const [pelis, setPeli] = useState<Partial<pelicula>[]>([]);
  const[name, setName] = useState<string>("");
  const[tipo, setTipo] = useState<string >("");
  const[valoracion, setValo] = useState<number>(0);
  const[duracion, setDuracion] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [comentarios , setComentarios]= useState<string>("");
  const [plataforma , setPlataforma]= useState<string>("");
  const [error,setError] = useState<boolean>(false);

  //funcion para bsucar las peliculas(todas ellas)
  const fetchData = async ()=> {
    const pelis = await fetch(`http://localhost:8000/getPelis`);
    const json = await pelis.json();

    console.log(json);
    setPeli(json.peliDB);
    console.log(json.peliDB);

    
  };
  //funcion para elimiar pelicula en concreto a traves de un botón
  const eliminar = async (id: string) => {
     const prueba =  await fetch(`http://localhost:8000/deletePeli/${id}`,{
      method: 'DELETE',
     });

     fetchData();
     if(prueba.ok){
      setError(false);
     }else{
      setError(true);
     }

  }

  //Funcion para aadir pelicula a través de un botón
  async function postPeli(){
    const introducir: Partial< pelicula> = {
      name : name,
      tipo: tipo,
      valoracion: valoracion,
      duracion: duracion,
      image: image,
      comentarios: comentarios,
      plataforma: plataforma


    }
    await fetch(`http://localhost:8000/addPeli`, {
      method: 'POST',
      body: JSON.stringify(introducir),
    })
    
    fetchData();
    setName("");
    setTipo("");
    setValo(0);
    setComentarios("");
    setDuracion(0);
    setImage("");
  }



  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);


  return(
    <>

      {error && <p>Error</p>}
      <br/>
     Peliculas: 
      <br/>
      <Peliculas>
      { pelis?.map((peli) => {
        return(
        <Pelicula key={peli._id}> 
        Nombre: <Link href={`/pelicula/${peli.name}`}>{peli.name}</Link> <br/>
        Imagen: <Image src={peli.image!} alt="Problema con foto" width="100" height="200"/> <br/>
        <button onClick={async() => {
          try{
            console.log(peli._id!);
            await eliminar(peli._id!);
            setError(false)
          }catch(e){
            console.log(peli._id!);
            setError(true)
          }
              
            }
          }>Eliminar</button>
        </Pelicula>)
      })}
      </Peliculas>
      Añadir Pelicula: 
      <br/>
      <Formulario id="Formulario">
      <div>
            Name:
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
        Importante no dejar un espacio al final!<br/> 
        </div>
        <div>
            Tipo:

        <select name="Tipos" id="types" onChange={(e) => setTipo(e.target.value)}>
          <option value="">Seleccione tipo</option>
          <option value="Accion">Accion</option>
          <option value="Aventura">Aventura</option>
          <option value="Drama">Drama</option>
          <option value="Comedia">Comedia</option>
          <option value="Terror">Terror</option>
          <option value="Anime">Anime</option>
          <option value="Suspense">Suspense</option>
          <option value="Romance">Romance</option>
      </select>

      

        </div>
<div>
        PLataforma:

<select name="Tipos" id="types" onChange={(e) => setPlataforma(e.target.value)}>
  <option value="">Seleccione plataforma</option>
  <option value="Netflix">Netflix</option>
  <option value="PrimeVideo">PrimeVideo</option>
  <option value="HBO">HBO</option>
  <option value="Disney">Disney</option>
  <option value="Chrunchyroll">Chrunchyroll</option>
</select>



</div>
        <div>
            Valoracion:
        <input type="number" placeholder="Valoracion" onBlur={(e) => setValo(parseInt(e.target.value))}></input>
        </div>
        <div>
            Duracion "en minutos":
        <input type="number" placeholder="Duracion" onBlur={(e) => setDuracion(parseInt(e.target.value))}></input>
        </div>
        <div>
            Imagen:
        <input type="text" placeholder="Imagen" onChange={(e) => setImage(e.target.value)}></input>
        </div>
        <div>
            Comentarios:
        <input type="text" placeholder="Comentarios" onChange={(e) => setComentarios(e.target.value)}></input>
        </div>

        <button onClick={async(e) => {
          try{
          await postPeli();
          console.log("LLego aki");
          console.log("Name: ", name);
          console.log("Valo: ", valoracion);
          console.log("Dura: ", duracion);
          console.log("Tipo: ", tipo);
          console.log("Imagen: ", image);
          setError(false);
          }catch(e){
            setError(true);
          }
         }}> Añadir</button>
         </Formulario>

         Busqueda por tipos: 

         <Busqueda>
          
         <Link href={"/tipos/Accion"}><button>Accion</button></Link>
         <Link href={"/tipos/Aventura"}><button>Aventura</button></Link>
         <Link href={"/tipos/Drama"}><button>Drama</button></Link>
         <Link href={"/tipos/Comedia"}><button>Comedia</button></Link>
         <Link href={"/tipos/Terror"}><button>Terror</button></Link>
         <Link href={"/tipos/Anime"}><button>Anime</button></Link>
         <Link href={"/tipos/Suspense"}><button>Suspense</button></Link>
         <Link href={"/tipos/Romance"}><button>Romance</button></Link>


         </Busqueda>


    </>
  )
}

export default Tabla;