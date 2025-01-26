import React, { useState, useEffect } from "react";
import { fetchBlogs } from "./firebaseFunctions";
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Row,
    Container,
    Col,
} from "reactstrap";
function Blogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const loadBlogs = async () => {
            const fetchedBlogs = await fetchBlogs();
            setBlogs(fetchedBlogs);
        };
        loadBlogs();
    }, []);

    return (
        <div>
            <h1 className="News">En Son Kripto Haberleri</h1>
            <Row className="Ncart">
                {blogs.map((blog) => (
                    <Col md={3} key={blog.id}>
                        <Card style={{ width: '18rem', marginBottom: '20px' }}>
                            <img
                                alt={blog.title}
                                src={blog.image}
                                style={{ height: '150px', objectFit: 'cover' }}
                            />
                            <CardBody>
                                <CardTitle tag="h5">{blog.title}</CardTitle>
                                <CardSubtitle className="mb-2 text-muted" tag="h6">
                                    {blog.subtitle}
                                </CardSubtitle>
                                <CardText>{blog.text.slice(0, 100)}...</CardText>
                                <a href={blog.link} target="_blank" rel="noopener noreferrer">
                                    <Button color="btn btn-outline-secondary">Daha Fazla Oku</Button>
                                </a>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Blogs;
