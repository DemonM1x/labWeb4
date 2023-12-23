import {Component} from "react";
import {connect} from "react-redux";
import {setAnswer} from "../actions/userAction";
import {sendPoint, setR, setX, setY} from "../actions/coordinatesAction";
import "../screen/chooseForm.css"
import FormErrors from "./FornErrors";
import Button from "react-toolbox/lib/button";
class ChooseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            X: '',
            R: '',
            Y: '',
            formErrors: {paramX: '', paramR: '', paramY: '', all: ''},
            paramXValid: false,
            paramRValid: false,
            paramYValid: false,
        };
    }

    handleXChange = (event) => {
        let x = event.target.value.replace(',','.')
        this.setState({ X: x });
        this.props.setX(x)
        this.validateField('paramX', x);
    };
    handleYChange = (event) => {
        let y = event.target.value.replace(',', '.')
        this.setState({ Y: y });
        this.props.setY(y)
        this.validateField('paramY', y);
    };
    handleRChange = (event) => {
        let r = event.target.value.replace(',','.')
        this.setState({ R: r });
        this.props.setR(r)
        this.validateField('paramR', r);
    };
    paramsIsReady = (e) => {
        let errors = this.state.formErrors;
        if (!this.state.formValid) {
            errors.all = 'Неправильно введенные поля';
            this.setState({formErrors: errors
            })
            e.preventDefault();
        }
        else {
            errors.all = ''
            this.onSubmit(e);
        }
    };
    onSubmit = (e) => {
        e.preventDefault();
        const { X, Y, R } = this.state;


        // Ensure both X and R are selected, and Y is not empty
        if (X !== '' && Y !== '' && R !== '') {
            this.props.sendPoint({
                x: X,
                y: Y,
                r: R
            });
        }
    }
    validateField(fieldName, value) {

        this.props.setAnswer('');
        let fieldValidationErrors = this.state.formErrors;
        let paramXValid = this.state.paramXValid;
        let paramYValid = this.state.paramYValid;
        let paramRValid = this.state.paramRValid;
        value = value.replace(',','.')
        switch (fieldName) {
            case 'paramX':
                paramXValid = (value !== '');
                fieldValidationErrors.paramX = paramXValid ? '' : 'Выберите X';
                if (!paramXValid) break;
                paramXValid = (!(isNaN(value) && value || !isNaN(value) && (Number(value) < -5 || Number(value) > 5)));
                fieldValidationErrors.paramX = paramXValid ? '' : 'от -5 до 5'
                break;
            case 'paramR':
                paramRValid = (value !== '');
                fieldValidationErrors.paramR = paramRValid ? '' : 'Выберите R';
                if (!paramRValid) break;
                paramRValid = (!(isNaN(value) && value || !isNaN(value) && (Number(value) < 1 || Number(value) > 5)));
                fieldValidationErrors.paramR = paramRValid ? '' : 'от 1 до 5'
                break;
            case 'paramY':
                paramYValid = (value !== '');
                fieldValidationErrors.paramY = paramYValid ? '' : 'Введите Y';
                if (!paramYValid) break;
                paramYValid = (!(isNaN(value) && value || !isNaN(value) && (Number(value) < -3 || Number(value) > 5)));
                fieldValidationErrors.paramY = paramYValid ? '' : 'от -5 до 5'
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            paramXValid: paramXValid,
            paramYValid: paramYValid,
            paramRValid: paramRValid,

        }, this.validateForm);

    }

    validateForm() {
        this.setState({
            formValid: this.state.paramXValid &&
                this.state.paramYValid && this.state.paramRValid
        });

    }


    render() {
        return (
            <div className="container2">
                <form onSubmit={this.paramsIsReady} className='forma'>
                    <p className="p1">Выберите X: </p>
                    <input className="inputX"
                           type="text"
                           value={this.state.X}
                           onChange={this.handleXChange}
                           placeholder="Enter X value"
                    />
                <p className="p2">Выберите Y: </p>
                <input className="inputY"
                    type="text"
                    value={this.state.Y}
                    onChange={this.handleYChange}
                    placeholder="Enter Y value"
                />
                    <p className="p3">Выберите R: </p>
                    <input className="inputR"
                           type="text"
                           value={this.state.R}
                           onChange={this.handleRChange}
                           placeholder="Enter R value"
                    />
                    <div className="formErrors">
                        <FormErrors formErrors={this.state.formErrors} answer={this.props.app.answer}/>
                    </div>
                <Button label="Ввести" type={'submit'} className="button"/>
                </form>
            </div>
        );
    }
}

    const mapStateToProps = store => {
        return {
            app: store.app,
        }
    };

    const mapDispatchToProps = dispatch => {
        return {
            setX: x => dispatch(setX(x)),
            setR: r => dispatch(setR(r)),
            setY: y => dispatch(setY(y)),
            setAnswer: answer => dispatch(setAnswer(answer)),
            sendPoint: point => dispatch(sendPoint(point))
        }
    };


export default connect(mapStateToProps, mapDispatchToProps)(ChooseForm);