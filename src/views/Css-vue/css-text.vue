<template>
	<div>
		<el-button type="primary" @click="getaaa()  " style="margin-bottom: 20px;">触发一个事件 我想看看效果</el-button>

		<el-button type="primary" @click="getbbbb()  " style="margin-bottom: 20px;">异步操作</el-button>

		<el-button type="primary" @click="openDB('帅哥建的数据库','person','1')" style="margin-bottom: 20px;">生成数据库</el-button>

		<el-button type="primary" @click=" add('person', {name: '欧阳霸天', age: '5', sex: '男'})  " style="margin-bottom: 20px;">新增值</el-button>

		<el-button type="primary" @click="get('person')  " style="margin-bottom: 20px;">获取数据</el-button>

		<el-button type="primary" @click="foreach('person')  " style="margin-bottom: 20px;">遍历数据</el-button>

		<el-button type="primary" @click="update('person',  {name: '伊莉莎逐星', age: '100', sex: '女'})  " style="margin-bottom: 20px;">更新数据</el-button>

		<el-button type="primary" @click="remove('person', 2)" style="margin-bottom: 20px;">删除数据</el-button>

		<el-button type="primary" @click="searchFromIndex('person', 'name', '伊莉莎逐星')" style="margin-bottom: 20px;">根据索引查数据</el-button>


		<div class="aaa"></div>
		333
		<div class="imgsa">
			1222

		</div>
		<!-- <img src="../../staticFile/img/threejs65tree.png" />
		<img src="../../staticFile/img/timg.jpg" /> -->
	</div>
</template>

<script>
	export default {


		data() {
			return {
				db: '',
				request: '', //数据库
			}
		},
		methods: {
			add(objectStoreName, argument) {
				console.log(objectStoreName, argument, '3333');


				console.log(this.db, '！！！！！！')
				if (this.db != null) {
					console.log(this.db)

					// 执行事务，添加数据到对象仓库（表）
					var request = this.db.transaction([objectStoreName], 'readwrite')
						.objectStore(objectStoreName)
						.add(argument);

					request.onsuccess = function(event) {
						console.log('数据写入成功');
					};

					request.onerror = function(event) {
						console.log('数据写入失败');

					}
				}
			},

			getbbbb() {

				// 	let promise = new Promise(function(resolve, reject) {
				// 	  console.log('Promise');
				// 	    reject('啊啊啊啊');
				// 	});

				// 	promise.then(function() {
				// 	  console.log('resolved.成功');
				// 	}).catch(function(aaa){
				// 		console.log(aaa,'我是失败的方法');
				// 	}).finally(() => {	
				// 		console.log('这是无论如何都要执行的');
				// 	});

				var A = new Promise((resolve, reject) => {

					setTimeout(function() {
						console.log('111111');
						 resolve();
					}, 1500);


				})
				var B = new Promise((resolve, reject) => {
					setTimeout(function() {
						console.log('222222');
						 resolve();
					}, 500);

				})
				var C = new Promise((resolve, reject) => {
					setTimeout(function() {
						console.log('3333333');
						reject();
					}, 2000);

				})

				const D = Promise.race([A, B, C]).then(function() {
					console.log('成功了');
				}).catch(function() {
					console.log('失败了');
				}).finally(function(){
					console.log('我无论如何都会执行');
				})







			},

			getaaa(x, z = '我都告别地方都是') {
				var [a, b, c] = [1, 2, 3];
				var [head, ...content] = [1, 2, 3, 1, 45, 55]
				var [def = 'aaa'] = [];

				var [x, y] = ['aaa', 'bbbb'];
				[x, y] = [y, x];
				var {
					length: len
				} = '厕所发大水范德萨发达'
				var {
					a = '333', b
				} = {
					b: [1, 2]
				}

				var aabb = [1, 2, 3, 4, 5, 6].copyWithin(1, 4, 4)

				var fills = ['a', 'vb', 'c'].fill('7')

				var includs = ['a0', '2', 'c'].includes('2a');

				var aaaas = ['a', 'b', ['c', 'd', ['e', 'f', 'g', ['h']]]].flat(3);

				var avb = {
					a: 2333,
					b: "dfsdf反倒是"
				}
				var ab = {
					c: '打发士大夫',
					d: 666
				}

				var ccc = { ...ab,
					...avb
				}

				var ass = { ..."hello"
				}

				var sets = [1, 1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7, 7, 7]

				var arrays = Array.from('233333', (item) => {
					return item * 2
				});

				let obj = {
					['h' + 'ello']() {
						return 'hi';
					}
				};

				let arr = [3, 5, 2, 2, 5, 5];
				let unique = new Set(arr);

				var setsss = [...new Set(unique)];
				console.log(setsss, '我是当前输出的值');

			},

			get(objectStoreName) {
				if (this.db != null) {
					console.log(this.db)

					// 执行事务，从对象仓库（表）中获取所有数据
					var request = this.db.transaction([objectStoreName], 'readwrite')
						.objectStore(objectStoreName).getAll()

					// 数据获取失败
					request.onerror = function(event) {
						console.log('事务失败')
					}

					//数据获取成功
					request.onsuccess = function(event) {
						if (request.result) {
							// 打印所有数据
							console.log(request.result)
						} else {
							console.log('未获得数据记录')
						}
					};
				}
			},

			// 对象仓库（表名）
			foreach(objectStoreName) {
				var this_ = this;
				if (this_.db != null) {
					console.log(this_.db, '^^^^^^')

					// 执行事务，从对象仓库（表）中获取所有数据
					var request = this_.db.transaction([objectStoreName], 'readwrite')
						.objectStore(objectStoreName).openCursor()

					// 数据获取失败
					request.onerror = function(event) {
						console.log('事务失败')
					}

					//数据获取成功
					request.onsuccess = function(event) {
						console.log(event, request, '3333')
						let cursor = request.result
						if (cursor) {
							// 遍历打印所有数据
							console.log(cursor)
							console.log(cursor.key)
							console.log(cursor.value.name)
							console.log(cursor.value.age)
							console.log(cursor.value.sex)
							cursor.continue()
						} else {
							console.log('未获得数据记录')
						}
					};
				}
			},

			update(objectStoreName, argument) {
				console.log(objectStoreName, argument, '🐱🐱🐱🐱');
				var this_ = this;
				if (this_.db != null) {
					console.log(this_.db)

					// 执行事务，添加数据到对象仓库（表）
					var request = this_.db.transaction([objectStoreName], 'readwrite')
						.objectStore(objectStoreName)
						.put(argument);

					request.onsuccess = function(event) {
						console.log('数据更新成功');
					};

					request.onerror = function(event) {
						console.log('数据更新失败');
					}
				}
			},

			// 删除数据(若数据不存在，则不会执行删除操作)
			// 对象仓库（表名）
			remove(objectStoreName, index) {
				var this_ = this;
				if (this_.db != null) {
					console.log(this_.db)

					// 执行事务，从对象仓库（表）中获取所有数据
					var request = this_.db.transaction([objectStoreName], 'readwrite')
						.objectStore(objectStoreName).delete(index)


					console.log(request, objectStoreName, index, '44444444');
					// 数据获取失败
					request.onerror = function(event) {
						console.log('事务失败')
					}

					//数据获取成功
					request.onsuccess = function(event) {
						if (request.result) {
							// 遍历打印所有数据
							console.log(request.result)
						} else {
							console.log('未获得数据记录')
						}
					};
				}
			},

			// 根据索引查值(若数据不存在，返回一个[]数组)
			// 对象仓库（表名）
			searchFromIndex(objectStoreName, index, data) { //index 索引key  data结果
				var this_ = this;
				if (this_.db != null) {
					console.log(this_.db)

					// 执行事务，从对象仓库（表）中获取所有数据
					var request = this_.db.transaction([objectStoreName], 'readonly')
						.objectStore(objectStoreName).index(index).getAll(data)

					// 数据获取失败
					request.onerror = function(event) {
						console.log('事务失败')
					}

					//数据获取成功
					request.onsuccess = function(event) {
						if (request.result) {
							// 遍历打印所有数据
							console.log(request.result)
						} else {
							console.log('未获得数据记录')
						}
					};
				}
			},


			openDB(dbname, objectStoreName, version) {
				// 获取当前数据库版本号
				var version = version || 1

				// 获取数据库连接，若数据库不存在，会创建数据库（异步处理，根据情况自动触发下面三个事件）
				var request = window.indexedDB.open(dbname, version)

				// 获取数据库连接失败
				request.onerror = function(event) {
					console.log('IndexedDB数据库打开错误')
				}

				// 获取数据库连接成功 

				var this_ = this;

				request.onsuccess = function(event, callback) {
					console.log(event, '333333')
					this_.db = event.target.result;
					if (callback && (typeof callback === 'function')) {
						callback(this_.db)
					}
					if (this_.db != null) {
						console.log('数据库打开成功')
					}
				}

				// 创建新的储存空间（当第一次创建数据库、或者数据库版本号变化时会触发）
				request.onupgradeneeded = function(event) {
					console.log('数据库版本变化')
					console.log('创建数据库' + dbname)
					// 拿到数据库连接的结果对象
					this_.db = event.target.result;

					// 判断当前数据库中表（对象仓库）是否存在（注意此处是数据库的表名，不是数据库名）
					if (!this_.db.objectStoreNames.contains(objectStoreName)) {
						// 创建对象仓库，并设置主键自增
						var objectStore = this_.db.createObjectStore(objectStoreName, {
							keyPath: 'id',
							autoIncrement: true
						})

						// 创建索引（根据需要创建）
						objectStore.createIndex('name', 'name', {
							unique: false
						})

						objectStore.createIndex('age', 'age', {
							unique: false
						})

						objectStore.createIndex('sex', 'sex', {
							unique: false
						})
					}
				}
			}
		}
	}
</script>

<style>
	.aaa:empty {
		width: 200px;
		height: 200px;
		background: skyblue;
	}

	.aaa:empty::after {
		content: 'dd43ddd';
	}

	.imgsa {
		width: 600px;
		height: 600px;
		background: no-repeat center / contain;
		background-image: -webkit-cross-fade(url(../../staticFile/img/threejs65tree.png), url(../../staticFile/img/timg.jpg), 50%);
	}
</style>
