import type { NextPage } from 'next';
import Link from 'next/link';

const FourOhFour: NextPage = () => {
  return (
    <div className="utility-page-wrap">
    <div className="utility-page-404"><img src="images/404-02.svg" alt="" className="image-2" />
      <div className="_404text">
        <div className="_404text">too deep in the chaos. must restore order. too deep in the chaos. must restore order. too deep in the chaos. must restore order</div>
      </div>
      <div className="_404subheader">
        <p>
          <Link href="/"><a className="inline">return to order</a></Link><br />
        </p>
      </div>
    </div>
  </div>
  )
}

export default FourOhFour;
