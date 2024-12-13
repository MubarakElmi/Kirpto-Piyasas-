import React from 'react'
import foto from '../images/crypto-par-3.png'
function Header() {
    return (
        <section className='hero-section'>

            <dev className='col-md-6 hero-text'>
                <h2>Kripto <span>Anlık </span>
                    <div>Piyasası</div> </h2>

            </dev>

            <div class="col-md-6">
                <img src={foto} className="laptop-image" alt="Laptop" />
            </div>

            <div className='col-md-6 hero-text1'>
                <h3>Piyasa Değerine Göre Kripto Para Fiyatları</h3>
            </div>
        </section>
    )
}

export default Header