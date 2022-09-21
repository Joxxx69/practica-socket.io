// estoy en la parte del cliente

// Referencias del HTML
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');


const socket = io();


socket.on('connect',()=> {
    console.log('2. connected client on client.socket');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})


socket.on('disconnect', () => {
    console.log('3. client disconnected ');
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('enviar-mensaje-todos',(mensaje) => {
    console.log('Aqui!',mensaje);  
})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '13213',
        fecha: new Date().getTime()
    };
    socket.emit('enviar-mensaje', payload, id => {
        console.log('este es el id:', id);
        
        
    })
    
});



  