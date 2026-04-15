import { useState } from "react"
import { useNavigate } from "react-router-dom";

// File(interface)은 제공된 인터페이스
interface FormData{
    name: string;
    price: number;
    description:string;
    image:File | null // File을 선택하지 않으면 null 이고 선택하면 File이다.
}

const AddProduct = () => {
    //상품추가를 위한 폼 데이터 상태 관리
    const [formData, setFormData] = useState<FormData>({
        name:'',
        price: 0,
        description:'',
        image:null
    });

    const navigate = useNavigate();

    //입력값 변경 핸들러
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name , value, files} = e.target;

        //일반(텍스트, 숫자..) 데이터, 파일 데이터 구분해야함
        if(name === 'image' && files){
            setFormData({...formData, image: files[0]})
        }else{
            setFormData({...formData, [name]:value})
        }
    }

    //폼 제출 핸들러
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault(); // 기본 동작 방지

        //입력값 검증
        if(!formData.name || !formData.price || !formData.description){
            alert('모든 필드를 입력해주세요.');
            return ;
        }

        if(formData.price < 0){
            alert('가격은 0보다 커야합니다.');
            return ;
        }

        console.log("입력 데이터: ", formData);
        alert('상품이 등록되었습니다.');
        navigate('/products'); //상품 목록 페이지로 이동
    }

    return (
        <div className="add-product">
            <h2>상품등록</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">상품명 : </label>
                    <input 
                        type="text" 
                        id='name'
                        name='name'
                        placeholder="상품명을 입력하세요."
                        value={formData.name}
                        onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="price">가격 : </label>
                    <input 
                        type="number" 
                        id='price'
                        name='price'
                        placeholder="가격 입력하세요."
                        value={formData.price}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">상세 : </label>
                    <input 
                        type="text" 
                        id='description'
                        name='description'
                        placeholder="상세 설명을 입력하세요."
                        value={formData.description}
                        onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="image">이미지 : </label>
                    <input 
                        type="file" 
                        id='image'
                        name='image'                         
                        onChange={handleChange}/>
                </div>
                <button type='submit'>등록</button>
            </form>
        </div>
    )
}
export default AddProduct