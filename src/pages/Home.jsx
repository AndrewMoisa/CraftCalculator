import background from '../../public/assets/background.png';

function Home(){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
        
        <img src={background} alt="" />
        <div className='mt-10' >
            <h1 className="text-white text-2xl font-bold text-center">By Primejdie</h1>
        </div>
        </div>
        
    )
}


export default Home;