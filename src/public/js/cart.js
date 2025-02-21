function addToCart(productId) {
    fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: 1 }), 
    })
      .then(response => response.json())
      .then(data => {
        alert('Producto agregado al carrito');
        location.reload(); 
      })
      .catch(error => {
        console.error('Error al agregar al carrito:', error);
      });
  }
  

  function removeFromCart(productId) {
    fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        alert('Producto eliminado del carrito');
        location.reload(); 
      })
      .catch(error => {
        console.error('Error al eliminar del carrito:', error);
      });
  }
  

  function clearCart() {
    fetch(`/api/carts/${cartId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        alert('Carrito vaciado');
        location.reload(); 
      })
      .catch(error => {
        console.error('Error al vaciar el carrito:', error);
      });
  }
  
 
  function checkout() {
    fetch(`/api/checkout`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        alert('Pedido realizado');
        location.reload(); 
      })
      .catch(error => {
        console.error('Error al realizar el pedido:', error);
      });
  }
  