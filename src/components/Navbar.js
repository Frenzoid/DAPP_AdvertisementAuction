import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <img src='https://dl.airtable.com/.attachmentThumbnails/46d32d5ff3ef75de9d6c185c84a31782/c1744cda' width="30" height="30" className="d-inline-block align-top" alt="" />
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                        <small className="text-warning">
                            <small>{this.props.account.substring(0, 6)}...{this.props.account.substring(38, 42)}</small>
                        </small>
                        {this.props.account
                            ? <img
                                alt={this.props.account}
                                className='ml-2'
                                width='30'
                                height='30'
                                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                            />
                            : <span></span>
                        }
                    </li>
                </ul>
            </nav >
        );
    }
}

export default Navbar;