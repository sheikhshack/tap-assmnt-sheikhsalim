import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    InputGroup,
    Nav,
    Navbar,
    Overlay,
    Row,
    Tooltip
} from "react-bootstrap";
import {useRef, useState} from "react";
import shortService from './services/shorts'
import isURL from 'validator/es/lib/isURL';
import "./app.css"
import {Clipboard} from "react-bootstrap-icons";

const App = () => {

    const [result, setResult] = useState("")

    const handleSubmit = async (encodedUrl) => {
        const response = await shortService.createNewShort({
            actualURL: encodedUrl
        })

        setResult(response.shortenedURL)
    }

    const generateResult = () => {
        if (result !== "") {
            return (
                <Result link={result}/>
            )
        }
        return null
    }


    return (
        <div>
            <Navigation/>

            <Container style={{marginTop: "10%"}}>
                <h2 className={"hero-text"}>Shorten any url, at the click of a finger! </h2>
                <EntryBox handleSubmit={handleSubmit}/>
            </Container>
            {generateResult()}

        </div>
    )
}

const Navigation = () => {
    const openSourceCode = () => {
        window.open("https://github.com/sheikhshack", "_blank");
    }

    return (
        <Navbar bg='dark' expand='lg' variant={'dark'}>
            <Navbar.Brand>TAP Shortener</Navbar.Brand>
            <Nav className={'mr-auto'}>

            </Nav>
            <Button variant="success" onClick={() => openSourceCode()}>Source</Button>

        </Navbar>
    )
}


const EntryBox = ({handleSubmit}) => {

    const [longUrl, setLongUrl] = useState("")
    const [invalid, setInvalid] = useState(false)

    const validateInput = (event) => {
        event.preventDefault();
        const valid = isURL(longUrl, {require_valid_protocol: true, require_protocol: true})

        // if it passes, we proceed to allow it to be parsed proper
        if (valid) {
            const encodedUrl = new URL(longUrl).toString()
            setLongUrl(encodedUrl)
            handleSubmit(encodedUrl)
        } else {
            setInvalid(true)
        }

    }
    const handleChange = (val) => {
        setLongUrl(val)
        setInvalid(false)
    }

    return (
        <Form noValidate onSubmit={validateInput}>
            <Form.Group>
                <InputGroup hasValidation>
                    <Form.Control
                        type="text"
                        value={longUrl}
                        isInvalid={invalid}
                        placeholder="Enter your long URL here"
                        onChange={({target}) => handleChange(target.value)}
                    />
                    <InputGroup.Append>
                        <Button variant="success" type={"submit"}>Generate URL</Button>
                    </InputGroup.Append>
                    <Form.Control.Feedback type={"invalid"}>
                        Invalid URL Provided :(
                    </Form.Control.Feedback>

                </InputGroup>
            </Form.Group>
        </Form>

    )
}


const Result = ({link}) => {
    const [show, setShow] = useState(false)
    const target = useRef(null);


    const handleCopy = () => {
        setShow(true)
        navigator.clipboard.writeText(link)
    }

    return (
        <Container fluid={"sm"}>
            <Alert variant={"success"}>
                <Row>
                    <Col>
                        <Card.Text>Generated Link: <a href={link}>{link}</a> </Card.Text>
                    </Col>
                    <div className={"float-right"}>
                        <Button variant={"outline-dark"} ref={target} onClick={() => handleCopy()}>
                            <Clipboard/>
                        </Button>
                        <Overlay target={target.current} show={show} placement="bottom">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props}>
                                    Copied URL
                                </Tooltip>
                            )}
                        </Overlay>
                    </div>

                </Row>
            </Alert>
        </Container>


    )
}

export default App;


