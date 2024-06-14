import React from 'react'
import "../Styles/footer.css"

const footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div className="row">
                        <div className="col-md-4">
                            <h5 className="h5">Shop here</h5>
                            <ul>
                                <li>
                                    <a href="#">About Us</a>
                                </li>
                                <li>
                                    <a href="#">Our Team</a>
                                </li>
                                <li>
                                    <a href="#">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5 className="h5">Help</h5>
                            <ul>
                                <li>
                                    <a href="#">FAQs</a>
                                </li>
                                <li>
                                    <a href="#">Returns &amp; Refunds</a>
                                </li>
                                <li>
                                    <a href="/orders">orders</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5 className="h5">Stay Connected</h5>
                            <ul>
                                <li>
                                    <a href="#">Facebook</a>
                                </li>
                                <li>
                                    <a href="#">Twitter</a>
                                </li>
                                <li>
                                    <a href="#">Instagram</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default footer
