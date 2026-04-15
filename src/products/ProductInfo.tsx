import products from '../data/products.json'
import mouse from '../assets/mouse.png'
import keyboard from '../assets/keyboard.png'
import usb from '../assets/usb.png'
import monitor from '../assets/monitor.png'
import { Link, useParams } from 'react-router-dom'
import {imageMap} from './ProductList'

/*  
const imageMap:Record<string, string> = {
    'mouse.png': mouse,
    'keyboard.png': keyboard,
    'usb.png': usb,
    'monitor.png': monitor
}
*/
const ProductInfo = () => {
    const {id} = useParams();

    //id로 상품 찾기
    const product = products.find((p:any)=>p.id === Number(id));
    
    //id가 없는 경우
    if(!product){
        return <p>상품을 찾을 수 없습니다.</p>
    }

    return (
        <div className='product-info'>
            <h2>{product.name}</h2>
            <div className='product-details'>
                <img src={imageMap[product.image]} alt={product.name} />

                <div className='product-content'>
                    <p>{product.description}</p>
                    <p className='price'>가격: {product.price}원</p>

                </div>

            </div>
        </div>
    )
}

export default ProductInfo