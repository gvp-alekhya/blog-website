import useRouter from 'next/router';

export default function reqHandler(req, res) {
    const router = useRouter();
    return req.query;
}