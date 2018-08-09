import * as React from 'react';
import { Input, Icon, Form, Button, Upload, Select, Col, Row, message } from 'antd';
import { BookFormProps } from '@components/Book/BookTable/FilterableBooksTable';
import axios from 'axios';

const FormItem = Form.Item;
const Option = Select.Option;

export default class BookForm extends React.Component<BookFormProps> {

  state = {
    name: "",
    author: "",
    cost: "",
    genre: undefined,
    url: "",
    
    validateStatusErrorName: undefined,
    validateStatusErrorAuthor: undefined,
    validateStatusErrorCost: undefined,
    validateStatusErrorGenre: undefined,
    
    nameError: "",    
    authorError: "",
    costError: "",
    genreError: "",
    
    authorsOptions: [],

    
  };
  
  getAuthors = () => {
     
    axios.get(`http://localhost:4000/data/authors/all`).then(response => {
      var newAuthors: any = [],
          newAuthorsOptions: any = []

      for(var i = 0; i < response.data.length; i++) 
        newAuthors[i] = response.data[i].name + " " + response.data[i].surname
            
      newAuthorsOptions = newAuthors.map((author: any) => <Option key={author}>{author}</Option>);
            
      this.setState({ authorsOptions: newAuthorsOptions });
    })       
  }

  validate2 = (name: string, author: string) => {
    let result: string[] = [];
    let isErr = false;       
    let isErr2 =false
    axios.get(`http://localhost:4000/data/books/findbook?author=${author}&name=${name}`).then(response => {
        result = response.data
        console.log(result)
        console.log(result.length)
        if(result.length > 0) {
          isErr2 = true
          this.setState({
            nameError: "Such book already exists",
            validateStatusErrorName: "error"
          });
        } 
        return isErr2;  
    })

    isErr = isErr2
   return isErr
  };

  validate = () => {
    let isError = false;       

    if(this.state.name.length == 0 ) {
      isError = true;
      this.setState({
        nameError: "Please, fill the field",
        validateStatusErrorName: "error"
      });
    }

    if( typeof(this.state.author) == "undefined" ) {
      isError = true;

      this.setState({
        authorError: "Please, select the author",
        validateStatusErrorAuthor: "error"
      });
    }
    console.log(this.state.author)
    console.log(this.state.author.length)
    if( this.state.author.length == 0 ) {
      isError = true;

      this.setState({
        authorError: "Please, select the author",
        validateStatusErrorAuthor: "error"
      });
    }
    
    if((Number.parseInt(this.state.cost) <= 0) || (this.state.cost.length == 0)) {
      isError = true;
      this.setState({
        costError: "Cost must be more than 0",
        validateStatusErrorCost: "error"
      });
    }

    if( typeof(this.state.genre) == "undefined" ) {
      isError = true;
      this.setState({
        genreError: "Please, select the genre",
        validateStatusErrorGenre: "error"
      });
    }

    
    return isError;
  };

  addBook = (name: string, author: any, cost: number, genre: any) => {
    const {
      pagination,
      addBook
    } = this.props;   
        
    addBook(name, author, cost, genre, pagination);
  }  

  change = (e: any) => {            
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  changeGenre = (value: any) => {  
    this.setState({
      genre: value
    });    
  };

  changeAuthor = (value: any) => {  
    this.setState({
      author: value
    });    
  };


  onSubmit = (e: any) => {

    this.setState({      
      validateStatusErrorName: undefined,
      validateStatusErrorAuthor: undefined,
      validateStatusErrorCost: undefined,
      validateStatusErrorGenre: undefined,
      nameError: "",    
      authorError: "",
      costError: "",
      genreError: ""
    });

    e.preventDefault();
    const err = this.validate();
    const err2 = this.validate2(this.state.name, this.state.author);
   console.log(err);
   console.log(err2)

    if(err==true && err2==true) {
      this.addBook(this.state.name, this.state.author, Number.parseInt(this.state.cost), this.state.genre);
      this.state;
      message.success("Success");
    }       
  };
      
  render() {
    return(
      <Row>
      <Col span={12}> Registration Form
        <Form 
        className="login-form"
        style={{
          padding: "20px",           
          border: "1px solid",
          borderRadius: "5px",
          borderColor: "#ebedf0",
          width: "260px"
          }}>
          <FormItem
            validateStatus={this.state.validateStatusErrorName}
            help={this.state.nameError}>
              <Input                           
                prefix={<Icon type="book" />}
                value={this.state.name}
                type="text"
                onChange={e => this.change(e)} 
                placeholder="Enter the name" 
                name="name"
              />            
          </FormItem>

          <FormItem
            validateStatus={this.state.validateStatusErrorAuthor}
            help={this.state.authorError}>
            <Select              
              allowClear={true}                                                 
              placeholder="Select the author"
              value={this.state.author}                 
              style={{ width: 218 }}
              onFocus={() => this.getAuthors()}              
              onChange={(value: any) => this.changeAuthor(value)}>               
              {this.state.authorsOptions}                                    
              </Select>
          </FormItem>
          <FormItem
            validateStatus={this.state.validateStatusErrorCost}
            help={this.state.costError}>
              <Input
                prefix={<Icon type="credit-card" />}
                value={this.state.cost}
                type="number"
                onChange={e => this.change(e)} 
                placeholder="Enter the cost" 
                name="cost"
              />
          </FormItem>
          <FormItem 
            validateStatus={this.state.validateStatusErrorGenre}
            help={this.state.genreError}>
              <Select
                allowClear={true}                                  
                placeholder="Select the genre"                  
                style={{ width: 218 }}
                value={this.state.genre} 
                onChange={(value: any) => this.changeGenre(value)}>
                <Option value="Fantasy">Fantasy</Option>
                <Option value="Drama">Drama</Option>
                <Option value="Humor">Humor</Option>
                <Option value="Folklore">Folklore</Option>
                <Option value="Horror">Horror</Option>
              </Select>
          </FormItem>            
          <FormItem>
          <Upload 
            name='file'
            action='data/books/upload'>              
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
          </FormItem>
          <FormItem>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button"
              onClick={(e: any) => this.onSubmit(e)}>
              Добавить
            </Button>
          </FormItem>
        </Form> 
      </Col>      
    </Row>
    );
  }
}