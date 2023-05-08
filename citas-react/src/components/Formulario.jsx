import {useState, useEffect} from 'react';
import Error from './Error';


const Formulario = ({pacientes, setPacientes, paciente,setPaciente}) => {
    const [nombre,setNombre]=useState('');
    const [propietario,setPropietario]=useState('');
    const [email,setEmail]=useState('');
    const [fecha,setFecha]=useState('');
    const [Descripcion,setDescripcion]=useState('');
    
    const [error, setError] = useState(false)

    useEffect(()=>{
        if(Object.keys(paciente).length>0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setDescripcion(paciente.Descripcion)
        }
    }, [paciente])


    const generarId= () =>{
        const random =Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)

        return random+fecha

    }
    
    const handleSubmit = (e) => {
        e.preventDefault();


        //validacion del formulario

        if([nombre, propietario, email, fecha, Descripcion].includes('')){
            console.log('hay al menos un campo vacio')

            setError(true)
            return;
        }

        setError(false)
       
        //objeto de paciente
        const objetoPaciente ={
            nombre,
            propietario,
            email,
            fecha,
            Descripcion
        }
        if(paciente.id){
            //editando el registro
            objetoPaciente.id=paciente.id
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id===
                paciente.id  ? objetoPaciente: pacienteState)

                setPacientes(pacientesActualizados)
                setPaciente({})
        }else{
            //nuevo registro
            objetoPaciente.id=generarId()
            setPacientes([...pacientes,objetoPaciente])
        }

        //reiniciar form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setDescripcion('')
    }





  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">

        <h2 className="font-black text-3xl text-center">Seguimiento pacientes
        </h2>
        <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y{' '}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" >
            {error && <Error><p>Todos los campos son obligatorios</p></Error> }
            <div className="mb-5">

                <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota
                
                </label>

                <input id="mascota" type="text" placeholder="Nombre de la mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}/>
            </div>

            <div className="mb-5">

                <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario
                
                </label>

                <input value={propietario}
                onChange={(e)=>setPropietario(e.target.value)} id="propietario" type="text" placeholder="Nombre del propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
            </div>

             <div className="mb-5">

                <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email
                
                </label>

                <input value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                id="email" type="email" placeholder="Email contacto propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
            </div>

             <div className="mb-5">

                <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Fecha de la Alta
                
                </label>

                <input value={fecha}
                onChange={(e)=>setFecha(e.target.value)} id="alta" type="date" placeholder="Fecha de la alta del paciente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
            </div>

             <div className="mb-5">

                <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">sintomas
                
                </label>

                <textarea value={Descripcion}
                onChange={(e)=>setDescripcion(e.target.value)} id="sintomas" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Describe los sintomas del paciente"/>
            </div>

            <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold cursor-pointer hover:bg-indigo-700 transition-colors"
            value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}/>

        </form>

    </div>
  )
}

export default Formulario