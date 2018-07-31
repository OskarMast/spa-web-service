import * as React from 'react';
import { Table, Button, Icon, Popconfirm, message, Checkbox, Input, Form, Upload, Select, Modal} from 'antd';
import { Book } from '@redux/books/types';
import { Pagination } from '@redux/common/table/types';
import { ColumnProps } from 'antd/lib/table';
import { BooksTableProps } from './FilterableBooksTable';


const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

const options = [
  { label: 'Fantasy', value: 'Fantasy' },
  { label: 'Drama',  value: 'Drama' },
  { label: 'Humor',  value: 'Humor' },
  { label: 'Folklore',  value: 'Folklore' },
  { label: 'Horror',  value: 'Horror' },
];



export default class BookTable extends React.PureComponent<BooksTableProps> {


    state = { 
      _id: "",     
      name: "",
      author: "",
      cost: "",
      genre: "",
      validateStatusErrorName: undefined,
      validateStatusErrorAuthor: undefined,
      validateStatusErrorCost: undefined,
      validateStatusErrorGenre: undefined,
      nameError: "",    
      authorError: "",
      costError: "",
      genreError: "",
      visible: false,
      minValue: "",
      maxValue: ""

    };


    handleCostSort = (minValue: number, maxValue: number) => {
      const {        
        pagination,
        sortAllBooksByCost,
      } = this.props;  
      sortAllBooksByCost(minValue, maxValue, pagination);
      message.success('sorted!');      
    };
    
    handleReset() {
      const {
        pagination: {
          pageSize,
          current,
        },
        loadBooks,                
      } = this.props;  
      loadBooks({ pageSize, current });
    };

    sort = (field: string, order: string) => {
      const {
        pagination,
        sortBook
      } = this.props;
      //debugger
      sortBook(field, order, pagination);  
    };

    private readonly columns: ColumnProps<Book>[] = [ 
      {
        width: 120,
        title: 'Изображение',
        dataIndex: 'img',
        key: 'img',        
        render: (text, record) =>
        <div>          
          <img src={'http://127.0.0.1:8887/' + record.url} width="100%" height="100%" />
        </div>                
      },
      {
        title: 'Name',
        dataIndex: 'name',           
        key: 'name', 
        render: (text, record) => <span>{record.name}</span>
      },
      
      {
        title: 'Автор',
        dataIndex: 'author',
        key: 'author',
        render: (text, record) => <span>{record.author}</span>
      },
      {
        title: 'Цена',
        dataIndex: 'cost',
        key: 'cost',
        filterDropdown: () => (
          <div className="custom-filter-dropdown">     
            <Input
              prefix={<Icon type="wallet" />}
              value={this.state.minValue}
              style= {{width: 155, position: "fixed", marginTop: 10}}
              placeholder="min"
              name="minValue"
              onChange={e => this.change(e)} 
            />
            <Input 
              placeholder="max"
              prefix={<Icon type="wallet" />}
              value={this.state.maxValue}
              style={{width: 155, marginTop: 50,  position: "fixed"}}
              name="maxValue"
              onChange={e => this.change(e)}   
            />
            <Button 
              type="primary"  
              style={{marginLeft: 10, marginTop: 90}} 
              onClick={() => this.handleCostSort(Number.parseInt(this.state.minValue), Number.parseInt(this.state.maxValue))}>
              Filter
            </Button>
            <Button 
              type="primary"  
              style={{marginLeft: 10}} 
              onClick={() => this.handleReset()}>
              Reset
            </Button>    
          </div>
        ),
        render: (text, record) => <span>{record.cost}</span>
      },
      {
        title: 'Жанр',
        dataIndex: 'genre',
        key: 'genre', 
        filterDropdown: () => (
          <div className="custom-filter-dropdown">            
            <CheckboxGroup 
              options={options} 
              style={{ width: 90, height: 120 }}  
              onChange={this.changeGenre}/>
            <Button 
              type="primary"  
              style={{marginLeft: 57}} 
              onClick={() => this.handleGenreSort(this.state.genre)}>
              Filter
            </Button>
            <Button 
              type="primary"  
              style={{marginLeft: 5, marginTop: 10}} 
              onClick={() => this.handleReset()}>
              Reset
            </Button>    
          </div>
        ),
        render: (text, record) => <span>{record.genre}</span>
      },
      { width: 100,
        title: "Удалить",                               
        render: (text, record) =>
        <div> 
          <Popconfirm title="Are u sure delete this item?" 
            onConfirm={() => this.removeBook(record.key)}
            onCancel={this.cancelDelete}
            okText="Yes"
            cancelText="No">
              <Button
                size="small"
                type='danger'                
                >
                Удалить
                <Icon type="warning" /> 
              </Button>              
          </Popconfirm>                              
        </div>
      },
      { width: 150,
        title: 'Редактировать',
        render: (text, record) => 
        <div>
            <Modal
                  onOk={() => this.editBook(record.key)}
                  onCancel={this.handleCancel}
                  visible={this.state.visible}  
                  title="Редактирование">
                  <Form className="login-form">
                  <FormItem
                    label="Name"
                    validateStatus={this.state.validateStatusErrorName}
                    help={this.state.nameError}>
                    <Input
                      prefix={<Icon type="bars" />} 
                      placeholder="Edit the name"
                      value={this.state.name}
                      onChange={e => this.change(e)}
                      name="name"
                    />
                  </FormItem>
                  <FormItem
                    label="Author"
                    validateStatus={this.state.validateStatusErrorAuthor}
                    help={this.state.authorError}>                    
                    <Input
                      prefix={<Icon type="bars" />}                      
                      placeholder="Edit the author" 
                      value={this.state.author}
                      onChange={e => this.change(e)}
                      name="author"
                    />
                  </FormItem>
                  <FormItem
                    label="Cost"
                    validateStatus={this.state.validateStatusErrorCost}
                    help={this.state.costError}>
                    <Input 
                      prefix={<Icon type="bars" />}
                      placeholder="Edit the cost"
                      type="number"  
                      value={this.state.cost}
                      onChange={e => this.change(e)}
                      name="cost"
                    /> 
                  </FormItem>

                  <FormItem 
                    validateStatus={this.state.validateStatusErrorGenre}
                    help={this.state.genreError}>
                      <Select
                        defaultValue={this.state.genre}                                
                        style={{ width: 218 }} 
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
                      action={'data/books/postload?_id=' + this.state._id}>                      
                      <Button>
                        <Icon type="upload" /> Click to Upload
                      </Button>
                    </Upload>
                  </FormItem>
                                    
                  </Form>
                </Modal>             
            
              <Button 
                size="small"
                onClick={() => this.startEdit(record)}
              >
                Редактировать
                <Icon type="edit" />
              </Button>             
                                                        
        </div>
      }
    ]
       
    handleCancel = () => {      
      this.setState({
        visible: false,
      });
    }


    validate = () => {      
      let isError = false;
      if(this.state.name.length < 3 ) {
        isError = true;
        this.setState({
          nameError: "Name needs to be atleast 3 characters long",
          validateStatusErrorName: "error"
        });
      }
  
      if(this.state.author.length < 3) {
        isError = true;
        this.setState({
          authorError: "Author needs to be atleast 3 characters long",
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
  
      return isError;
    };

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
   
    startEdit = (record: Book) => {      
      this.setState({
        _id: record.key,
        name: record.name,
        author: record.author,
        cost: record.cost,
        genre: record.genre,
        visible: true
      });
    };


    editBook = (_id: string, ) => {      

      const {        
        editBook
      } = this.props;

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

      const err = this.validate();

      if(!err) {
        editBook(this.state._id, this.state.name, this.state.author, Number.parseInt(this.state.cost), this.state.genre);
        this.setState({
          _id: "",
          name: "",
          author: "",
          cost: "",
          genre: "",
          validateStatusErrorName: undefined,
          validateStatusErrorAuthor: undefined,
          validateStatusErrorCost: undefined,
          validateStatusErrorGenre: undefined,
          nameError: "",    
          authorError: "",
          costError: "" ,
          genreError: "",
          visible: false       
        });        
        message.success('Edited!');
      } 
    };

    removeBook = (_id: string) => {
      const {        
        pagination,
        removeBook,
      } = this.props;  
      removeBook(_id, pagination);
      message.success('Deleted!');      
    };

    handleGenreSort = (genre: string) => {
      const {        
        pagination,
        sortBook2,
      } = this.props;  
      sortBook2(genre, pagination);
      message.success('sorted!');      
    };

    cancelDelete() {
      message.error('Cancel!');
    };
    
    componentDidMount() {
     
      const {
        pagination: {
          pageSize,
          current,
        },
        loadBooks,                
      } = this.props;  
      loadBooks({ pageSize, current });
    };
  
    handleTableChange = ({ pageSize, current }: Pagination) => {
      this.props.loadBooks({ pageSize, current });      
    };   
  
    render() {
      const {
        loading,
        pagination,
        books,
                
      } = this.props;
  
      return (
        <div>           
          <Table          
            bordered
            columns={this.columns}
            dataSource={books}          
            loading={loading}
            pagination={pagination}
            size='small'
            style={{ width: 1100 }}
            onChange={this.handleTableChange}
          />
        </div>                
      )
    }
  }