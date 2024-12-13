import React from 'react'
import { Container, Row, Col, Stack, Image, Nav, NavLink } from 'react-bootstrap';
function Footer() {
    return (
        <footer className='footer'>
            <Container fluid >
                <Row className='bg-secondary text-white p-4'>
                    <Col className='mx-5'>
                        <Stack>
                            <Image

                                src="src\images\WORLD.png" className="logof"

                            />
                            <h2>Kirpto Paysasi</h2>
                            <p>Kirpto anlik fiyatlari</p>
                        </Stack>

                    </Col>
                    <Col>
                        <Nav className='footer1'>
                            <NavLink href='/' className='text-white'>Home</NavLink>
                            <NavLink href='borse' className='text-white'>Meme Coins</NavLink>
                            <NavLink href='Heatmap' className='text-white'>Heatmap</NavLink>
                            <NavLink href='blogs' className='text-white'>Blog</NavLink>
                        </Nav>
                    </Col>
                    <Col>
                        <h4>Contact Us</h4>
                        <p>m-manblack@hotmail.com</p>

                    </Col>
                </Row>

            </Container>



        </footer>
    )
}

export default Footer