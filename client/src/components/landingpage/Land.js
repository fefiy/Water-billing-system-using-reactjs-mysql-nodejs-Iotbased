import React from "react";
import "./css/media.css";
import "./css/theme.css";
import Login from "./Login";
const Land = () => {
  return (
    <div>
      <div className="DesignHolder">
        {/* <!-- \\ Begin Frame \\ --> */}
        <div className="LayoutFrame">
          {/* <!-- \\ Begin Header \\ --> */}
          <header>
            <div className="Center">
              <div className="site-logo">
                <h1>
                  <a href="#">
                    No<span>vem</span>ber
                  </a>
                </h1>
              </div>
              <div id="mobile_sec">
                <div className="mobile">
                  <i className="fa fa-bars"></i>
                  <i className="fa fa-times"></i>
                </div>
                <div className="menumobile">
                  {/* <!-- \\ Begin Navigation \\ --> */}
                  <nav className="Navigation">
                    <ul>
                      <li className="">
                        <a href="#home">Home</a>
                        <span className="menu-item-bg"></span>
                      </li>
                      <li>
                        <a href="#about">About</a>
                        <span className="menu-item-bg"></span>
                      </li>
                     
                      
                      <li>
                        <a href="#contact">Contact</a>
                        <span className="menu-item-bg"></span>
                      </li>
                      <li>
                        <a href="#pricing">Login</a>
                        <span className="menu-item-bg"></span>
                      </li>
                    </ul>
                  </nav>
                  {/* <!-- // End Navigation // --> */}
                </div>
              </div>
              <div className="clear"></div>
            </div>
          </header>
          {/* <!-- // End Header // -->
        <!-- \\ Begin Banner Section \\ --> */}
          <div className="Banner_sec" id="home">
            {/* <!--  \\ Begin banner Side --> */}
            <div className="bannerside">
              <div className="Center">
                {/* <!--  \\ Begin Left Side --> */}
                <div className="leftside">
                  <h3>
                    Responsive<span>Mobile Friendly</span>
                  </h3>
                  <p>
                    November is a professional website template that is
                    responsive and mobile friendly for any device. This template
                    is provided by templatemo.com
                  </p>
                  <a href="#about">MORE DETAILS</a>
                </div>
                {/* <!--  // End Left Side // -->
                    <!--  \\ Begin Right Side --> */}
                <div className="rightside">
                  <ul id="slider">
                    <li>
                      <div className="Slider">
                        <figure>
                          <img src="img/Slider-img1.jpg"  />
                        </figure>
                        <div className="text">
                          <div className="Icon">
                            <ul>
                              <li>
                                <a href="#">
                                  <i className="fa fa-heart"></i>700
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fa fa-commenting"></i>150
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="Lorem">
                            <p>
                              lorem quis bibendum <span>Necagittis Nibel</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="Slider">
                        <figure>
                          <img src="img/Slider-img2.jpg"  />
                        </figure>
                        <div className="text">
                          <div className="Icon">
                            <ul>
                              <li>
                                <a href="#">
                                  <i className="fa fa-heart"></i>700
                                </a>
                              </li>
                              <li className="num">
                                <a href="#">
                                  <i className="fa fa-commenting"></i>150
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="Lorem">
                            <p>
                              lorem quis bibendum<span>Necagittis Nibel</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <figure>
                    <img src="img/Shadow-img.png"  className="Shadow" />
                  </figure>
                </div>
                {/* <!--  // End Right Side // --> */}
              </div>
            </div>
            {/* <!--  // End banner Side // --> */}
            <div className="clear"></div>
          </div>
          {/* <!-- // End Banner Section // --> */}
          <div className="bgcolor"></div>
          {/* <!-- \\ Begin Container \\ --> */}
          <div id="Container">
            {/* <!-- \\ Begin About Section \\ --> */}
            <div className="About_sec" id="about">
              <div className="Center">
                <h2>about us</h2>
                <p>
                  Aenean sollicitudin, lorem quis bibendum auctor, nisi elit
                  consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio
                  sit amet nibh vulputate cursus a sit
                  <br /> amet mauris. Morbi accumsan ipsum velit. Nam nec tellus
                  a odio tincidunt auctor a ornare odio.
                </p>
                <div className="Line"></div>
                {/* <!-- \\ Begin Tab side \\ --> */}
                <div className="Tabside">
                  <ul>
                    <li>
                      <a
                        href="javascript:;"
                        className="tabLink activeLink"
                        id="cont-1"
                      >
                        Mision
                      </a>
                    </li>
                    <li>
                      <a href="javascript:;" className="tabLink" id="cont-2">
                        vision
                      </a>
                    </li>
                    <li>
                      <a href="javascript:;" className="tabLink" id="cont-3">
                        Sponsors
                      </a>
                    </li>
                  </ul>
                  <div className="clear"></div>
                  <div className="tabcontent" id="cont-1-1">
                    <div className="TabImage">
                      <div className="img1">
                        <figure>
                          <img src="img/about-img2.jpg" />
                        </figure>
                      </div>
                      <div className="img2">
                        <figure>
                          <img src="img/about-img1.jpg"  />
                        </figure>
                      </div>
                    </div>
                    <div className="Description">
                      <h3>
                        Sed ac urna sit amet lorem
                        <span>
                          taciti sociosqu ad litora torquent per conubia
                        </span>
                      </h3>
                      <p>
                        November is free HTML CSS website template from{" "}
                        <span className="cyan">templatemo</span> and you can
                        download and use it for any purpose. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Nullam elit nunc,
                        porta commodo euismod eu, fermentum a neque. Fusce
                        scelerisque tincidunt auctor. Integer varius ullamcorper
                        interdum.
                      </p>
                      <p>
                        Phasellus pretium elementum rhoncus. Aenean sit amet
                        odio eu ante volutpat rutrum. Vestibulum ullamcorper
                        faucibus orci, in blandit massa fringilla at. Nulla in
                        fermentum eros. Suspendisse vitae aliquam metus.
                      </p>
                    </div>
                  </div>
                  <div className="tabcontent hide" id="cont-2-1">
                    <div className="TabImage">
                      <div className="img1">
                        <figure>
                          <img src="img/about-img2.jpg"  />
                        </figure>
                      </div>
                      <div className="img2">
                        <figure>
                          <img src="img/about-img1.jpg"  />
                        </figure>
                      </div>
                    </div>
                    <div className="Description">
                      <h3>
                        Smauris vitae consequat
                        <span>Vestibulum ullamcorper faucibus orci</span>
                      </h3>
                      <p>
                        Consequat ipsum, nec sagittis sem nibh id elit. Dui sed
                        odio sit amet nibh vulputate cursus a sit amet mauris.
                        Morbi accumsan ipsum velit. Namslo nec tellus a odio
                        tincidunt auctor a ornare odio. Smauris vitae erat
                        consequat sitsrl amet soi mauris auctor eu in elit.{" "}
                      </p>
                      <p>
                        className aptent taciti sociosqu ad litora torquent per
                        conubia nostraper inceptos himenaeos. Mauris in erat
                        justo. Nullam ac urna eu felis dapibus.
                      </p>
                    </div>
                  </div>
                  <div className="tabcontent hide" id="cont-3-1">
                    <div className="TabImage">
                      <div className="img1">
                        <figure>
                          <img src="img/about-img2.jpg"  />
                        </figure>
                      </div>
                      <div className="img2">
                        <figure>
                          <img src="img/about-img1.jpg"  />
                        </figure>
                      </div>
                    </div>
                    <div className="Description">
                      <h3>
                        Donec molestie malesuada nisl{" "}
                        <span>Aenean eget consequat diam</span>
                      </h3>
                      <p>
                        Nullam at sem non enim aliquam ultrices non quis magna.
                        In interdum interdum magna vitae accumsan. Etiam turpis
                        tortor, malesuada vitae metus non, pharetra auctor mi.
                        Pellentesque tincidunt enim vitae tincidunt euismod.
                        Integer id ex enim. Nullam euismod efficitur libero quis
                        interdum.
                      </p>
                      <p>
                        Phasellus porttitor tempus nibh, id luctus nibh porta
                        ac. Nunc sed metus est. Proin ut nisi metus. Duis
                        consectetur purus iaculis ornare suscipit.
                      </p>
                    </div>
                  </div>
                  <div className="clear"></div>
                </div>
                {/* <!-- // End Tab Side // --> */}
              </div>
            </div>
            {/* <!-- // End About Section // -->
       
        <!-- \\ Begin Contact Section \\ --> */}
            <div className="Contact_sec" id="contact">
              <div className="Contactside">
                <div className="Center">
                  <h2>contact us</h2>
                  <p>
                    Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum
                    fermentum nunc. Etiam pharetra, erat sed fermentum
                    <br />
                    feugiat velit mauris egestas quamut aliquam massa nisl quis
                    neque. Suspendisse in orci enim.
                  </p>
                  <div className="Line"></div>
                </div>
              </div>

              {/* <!-- \\ Begin Get Section \\ --> */}
              <div className="Get_sec">
                <div className="Mid">
                  {/* <!-- \\ Begin Left Side \\ --> */}
                  <div className="Leftside">
                    <form action="#">
                      <fieldset>
                        <p>
                          <input
                            type="text"
                            value=""
                            placeholder="NAME"
                            className="field"
                          />
                        </p>
                        <p>
                          <input
                            type="email"
                            value=""
                            placeholder="EMAIL"
                            className="field"
                          />
                        </p>
                        <p>
                          <input
                            type="text"
                            value=""
                            placeholder="TITLE"
                            className="field"
                          />
                        </p>
                        <p>
                          <textarea
                            cols="2"
                            rows="2"
                            placeholder="MESSAGE"
                          ></textarea>
                        </p>
                        <p>
                          <input type="submit" value="send" className="button" />
                        </p>
                      </fieldset>
                    </form>
                  </div>
                  {/* <!-- // End Left Side // -->
                        <!-- \\ Begin Right Side \\ --> */}
                  <div className="Rightside">
                    <h3>Get in touch !</h3>
                    <address>
                      990 Proin Gravida Street, Aliquet Snean Tate,
                      <br />
                      Lincoln Way, San Francisco, California.
                    </address>
                    <address className="Number">
                      (+001) 001 002 0034, (+002) 009 008 0760
                      <br />
                      (+003) 456 050 0670
                    </address>
                    <address className="Email">
                      <a href="mailto:info@november.com">info@november.com</a>
                    </address>
                    <div className="clear"></div>
                    <ul>
                      <li>
                        <a
                          rel="nofollow"
                          href="http://www.facebook.com/templatemo"
                          target="_parent"
                        >
                          <img src="img/facebook-icn.png"  />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="img/twitter-icn.png"  />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="img/google-plus-icn.png"  />
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- // End Right Side // --> */}
                </div>
                {/* <!-- \\ Begin Footer \\--> */}
               
                {/* <!-- // End Footer // --> */}
              </div>
              {/* <!-- // End Get Section // --> */}
            </div>
            {/* <!-- // End Contact Section // --> */}
          </div>
          <div className="Pricing_sec" id="pricing">
                <Login />
            </div>

          {/* <!-- // End Container // --> */}
        </div>
        {/* <!-- // End Layout Frame // --> */}
      </div>
    </div>
  );
};

export default Land;
