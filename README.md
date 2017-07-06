# Jmp (jquery multiple plugin)

## describe
jquery plug-in collection

## start

```js
npm install

npm start
```

## contain plugin

- tool-tip

- overflow-show

### API

实例：
```html
<div class="overflow-show">
	<span id="text">
		This is the content text, this text normally very long. So, the plugin will cutdowm the 
		text and your mouse moveon the poplayer will show.
	</span>
</div>
```
```js
$("#example").overflowShow('init', {
	width: 20,
	popWidth: 400,
	popTop: 10
})
```
![](img/overflowShowDemo.png)

`width: 20`:  [Number/String]Text over width value will be cutdown.

`popWidth: 400`:  [Number/String] Set the poplayer width.

`popTop: 20` :  [Number] The poplayer style position is absolute, popTop value will set the top position against the element.  


## From sources
```
$ git clone https://github.com/Fea-Sin/Jmp.git
$ cd Jmp
$ npm install
$ npm start
```

> Jmp one more!