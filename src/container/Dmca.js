import React from "react";
import axios from 'axios'
import useForm from 'react-hook-form'

const Dmca = () => {

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = data => {

    //console.log(data)
    axios.post(`http://api.koyal.pk/musicapp/?request=send-dmca-report`, data)
      .then(response => {

        console.log(response)

      })
      .catch(error => {
        console.log(error)
      })


  }


  return (
    <div className="homeMainClass">
      <div className="DMCA">
        <h2 className="CustomeH2">DMCA Policy</h2>





        <ul className="ListStyle">
          <li>
            Koyal.pk regards the others, and in return it also wants the same.
            Koyal.pk doesn't permit copyright infringing activities on its site.
            Koyal.pk will take out all the copyright content, and have the
            rights to end the account of the user who will include in such
            activity. Koyal.pk possesses the rights to suspend the account of
            such users who violate our terms and conditions.
          </li>
          <p className="tOP">
            <li>
              <b>Digital Millennium Copyright Act of 1998</b>
            </li>
          </p>
          <br></br>
          <li>
            In accordance with the Digital Millennium Copyright Act of 1998,
            Koyal.pk will respond expeditiously to claims of copyright
            infringement that are informed to Koyal.pk. If you consider your
            content has been imitated in any way, please provide the Koyal.pk
            the following information:
          </li>
          <li>
            <br></br>
            <b>1.</b> A physical or electronic signature of an individual
            authorized to act on behalf of the owner of a select right that's
            supposedly infringed.
          </li>
          <p className="tOP">
            <li>
              <b>2.</b> Identification of the copyright work claimed to have
              been infringed, or, in case different copyrighted works at a
              single online site are covered by a single notice, a
              representative list of such works at the website.
            </li>
          </p>
          <p className="tOP">
            <li>
              <b>3.</b> Identification of the material that has been claimed to
              be fringing or to be the subject of infringing action which is to
              be removed or access to which is to be disabled, and data sensibly
              sufficient to allow Koyal.pk to locate the material; this must be
              within the form of a direct URL to the page on which the
              infringing content is linked. This detail is essential as each
              content can have numerous links and to protect connections with
              our partners we wish to avoid deleting authorized links in error.
            </li>{" "}
          </p>
          <p className="tOP">
            <li>
              <b>4.</b> Data reasonably adequate to permit Koyal.pk to contact
              the complaining party, including a name, address, phone number
              and, if available, an e-mail address at which the complaining
              party may be contacted.
            </li>
          </p>
          <p className="tOP">
            <li>
              <b>5.</b> A statement that the complaining party contains a
              good-faith belief that use of the material in the manner
              complained of is not authorized by the copyright owner, its agent
              or the law.
            </li>
          </p>
          <p className="tOP">
            <li>
              <b> 6.</b> A statement that the data in the notification is
              accurate and, beneath penalty of perjury, that the complaining
              party is authorized to act on behalf of the owner of an exclusive
              right that's supposedly infringed.
            </li>
          </p>
        </ul>
        <h2 clsName="CustomeH2"> Report a Content</h2>
        <p className="DMCAContent">

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input className="DMCAName" placeholder="Name" name="name" ref={register} />

            {/* include validation with required or other standard HTML validation rules */}
            <input className="DMCAName" placeholder="Email" name="email" ref={register({ required: true })} />

            <input className="DMCAName" placeholder="Add Url's" name="urls" ref={register} />
            <input className="DMCAName" placeholder="Record Label" name="record_label" ref={register} />
            {/* errors will return when field validation fails  */}
            {errors.url && <span>This field is required</span>}

            {/* <input type="submit" /> */}
            <input className="DMCAButton" type="submit" />
          </form>


        </p>
      </div>
    </div>
  );
};

export default Dmca;
