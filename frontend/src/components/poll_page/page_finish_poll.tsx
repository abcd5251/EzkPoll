import thumbUp from '../../assets/thumb_up.png';
import Image from "next/image";

const PageFinishPoll = () => {
    return (
        <div>
            <h1>Thank you for participating</h1>
            <p>Your voice matters and will make impact to he better world</p>
            <Image src={thumbUp} width={296} height={244} alt="finish"/>
        </div>
    )
}

export default PageFinishPoll;