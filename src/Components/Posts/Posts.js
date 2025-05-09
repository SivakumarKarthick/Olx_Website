import { React, useEffect, useState, useContext, useNa } from 'react'
import { FirebaseContext } from '../../Store/FirebaseContext'
import { PostContext } from '../../Store/PostContext'
import { useNavigate } from 'react-router-dom'
import { LoadingContext } from '../../Store/LoadingContext'
import './Posts.css'
import Loading from '../Loading/Loading'
function Posts() {
    const navigate = useNavigate()
    const { firebase } = useContext(FirebaseContext)
    const [products, setProducts] = useState([])
   
    const { setpostDetails } = useContext(PostContext)
    const {setloading} = useContext(LoadingContext)

    useEffect(() => {
        firebase.firestore().collection('products').get().then((snapshot) => {
            const allPost = snapshot.docs.map((product) => {
                return {
                    ...product.data(),
                    id: product.id
                }
            })
            setProducts(allPost)
            setloading(true)
        })

    }, [])


    return (
        <div className='posts'>
            <div className="post-header">
                <h3>Recommened for you</h3>
                <a href="#">View More</a>
            </div>
            <div className="products">
                {products.map(product => {
                    return <div className="product"
                        onClick={() => {
                            setpostDetails(product)
                            navigate('/post')
                        }} >
                        <div className="top">
                            <img src={product.url} alt="" />

                        </div>
                        <div className="bottom">
                            <h4>₹{product.price}</h4>
                            <p>{product.yearOfPurchase}</p>
                            <p style={{ color: '#999999' }}>{product.proName}</p>
                        </div>
                    </div>
                })
                }
            </div>

        </div>
    )
}

export default Posts