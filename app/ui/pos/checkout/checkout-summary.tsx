
export default function CheckoutSummary() {


    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <p>ราคาสินค้าก่อนภาษี</p>
                <p>จำนวน: {} Unit </p>
                <p> { } baht </p>
            </div>
            {/*  */}
            <div className="flex justify-between">
                <p>ภาษีมูลค่าเพิ่ม 7%: { } </p>
                <p>จำนวน: {} Unit </p>
                <p> { } baht </p>
            </div>
            {/*  */}
            <div className="flex justify-between">
                <p>ส่วนลดท้ายบิล: { } </p>
                <p>จำนวน: {} Unit </p>
                <p> { } baht </p>
            </div>
            <div className="flex">
                <p>แลกคะแนน</p>
            </div>
            {/*  */}
            <div className="flex">
                <p>รวมทั้งสิ้น: { } </p>
                <p> { } baht </p>
            </div>
        </div>
    )
}