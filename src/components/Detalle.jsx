import './Detalle.css'

function Detalle({mostrar, pokemon, cerrar}){
    return(
        <div className='modal'onClick={cerrar} style={{display:mostrar ? 'grid':'none'}}>
            <section className='body'>
                <h1>Detalle</h1>
            </section>
        </div>
    )
}
export default Detalle