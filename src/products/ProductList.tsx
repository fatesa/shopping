import products from '../data/products.json'
import mouse from '../assets/mouse.png'
import keyboard from '../assets/keyboard.png'
import usb from '../assets/usb.png'
import monitor from '../assets/monitor.png'
import { Link } from 'react-router-dom'

//image 파일 저장 타입 정의
export const imageMap:Record<string, string> = {
    'mouse.png': mouse,
    'keyboard.png': keyboard,
    'usb.png': usb,
    'monitor.png': monitor
}

const ProductList = () => {
    return (
        <div className='product-list'>
            <h2>상품목록</h2>
            <div className='card-container'>
                {products.map((product:any)=>(
                    <Link to={`/products/${product.id}`}>
                        <div key={product.id} className='card'>
                            {/* imageMap[product.image] -> imageMap['mouse.png'] */}
                            <img src={imageMap[product.image]} alt={product.name} className='product-image' />
                            <div className='card-body'>
                                <h3 className='card-title'>{product.name}</h3>
                                <p className='card-text'>가격: {product.price}원</p>
                            </div>
                        </div>
                    </Link>
                ))}
                
            </div>
        </div>
    )
}

export default ProductList