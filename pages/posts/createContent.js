import { useState } from 'react';
import Layout from '../../components/layout';

import utilStyles from '../../styles/utils.module.css';
import Router from 'next/router'

export default function CreateContent({ postData }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        audio: '',
        image: ''
    });
    const handleChange = async (event) => {
        debugger
        let value;
        if (event.target.name === "image" || event.target.name === "video") {
            const file = event.target.files[0];
            getBase64(file).then((data, err) => {
                value = data;
                setFormData({
                    ...formData,
                    [event.target.name]: {
                        name: file.name,
                        base64: value,
                        type: file.type
                    }
                });
            });
        }

        else {
            value = event.target.value;
            setFormData({
                ...formData,
                [event.target.name]: value
            });
        }
    }

    const getBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleSubmit = async (event) => {
        debugger
        event.preventDefault();
        const res = await fetch('/api/createContent', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        res.json().then((s, e) => {
            Router.push('/');
        });

    }

    return (

        <Layout >
            <form onSubmit={handleSubmit} encType="multipart/form-data" className={ utilStyles.createForm} >
                <label htmlFor="title">Title:</label>
                <input  class="form-control"
                    type="text"
                    name="title"
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="description">Descritpion:</label>
                <input  class="form-control"
                    type="description"
                    name="description"
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="image" accept="image/*" class="form-control-file">Image:</label>
                <input type="file"  class="form-control"
                    name="image"
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="video">video:</label>
                <input type="file" accept="video/*"  class="form-control"
                    name="video"
                    onChange={handleChange}
                />
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </Layout>
    )
}