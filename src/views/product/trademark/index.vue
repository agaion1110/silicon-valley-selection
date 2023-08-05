<template>
    <el-card class="box-card">
        <!-- 卡片顶部的button按钮 -->
        <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
        <!-- 表格组件：用于展示已有的平台数据 -->
        <el-table style="margin: 10px 0;" border :data="trademarkArr">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称" width="" align="center" prop="tmName"></el-table-column>
            <el-table-column label="品牌Logo" width="" align="center">
                <template #="{ row }">
                    <el-image style="width: 100px; height: 100px" :src="row.logoUrl" :zoom-rate="1.2" fit="cover" />
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" width="" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" size="default" @click="updateTrademark(row)" icon="edit"></el-button>
                    <el-popconfirm :title="`您确定要删除${row.tmName}?`" width="250px" icon="Delete"
                            @confirm='removeTradeMark(row.id)'>
                            <template #reference>
                                <el-button type="primary" size="default" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器组件 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
            layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </el-card>

    <!-- 对话框组件:在添加品牌与修改已有品牌的业务时候使用结构 -->
    <!-- 
            v-model:属性用户控制对话框的显示与隐藏的 true显示 false隐藏
             title:设置对话框左上角标题
        -->
    <el-dialog :title="trademarkParams.id ? '修改品牌' : '添加品牌'" v-model="dialogFormVisible" @close="">
        <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
            <el-form-item label="品牌名称" label-width="80px" prop="tmName">
                <el-input v-model="trademarkParams.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
                <!-- upload组件属性:action图片上传路径书写/api,代理服务器不发送这次post请求  -->
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" v-model="trademarkParams.logoUrl">
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark,reqDeleteTrademark } from '@/api/product/trademark/index'
import { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus';
// 当前页面
let pageNo = ref<number>(1);
// 定义每一页展示多少数据
let limit = ref<number>(3);
let total = ref<number>(10);
// 当前页已有品牌的数据
let trademarkArr = ref<Records>([]);
// 控制弹出框显示与隐藏
let dialogFormVisible = ref<boolean>(false);
//定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
// 获取el-form组件实例对象
const formRef = ref();

//获取已有品牌的接口封装为一个函数:在任何情况下向获取数据,调用次函数即可
const getHasTrademark = async (page = 1) => {
    pageNo.value = page;
    let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value);
    if (result.code === 200) {
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    // console.log(response)
    trademarkParams.logoUrl = response.data
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
    //要求:上传文件格式png|jpg|gif 2M
    if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/gif') {
        ElMessage.error('上传的图片必须是JPG格式!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('上传图片的大小必须小于 2MB!')
        return false
    }
    formRef.value?.clearValidate('logoUrl')
    return true
}
onMounted(() => {
    getHasTrademark();
})
const handleSizeChange = async () => {
    getHasTrademark();
}
const handleCurrentChange = async () => {
    getHasTrademark(pageNo.value);
}
//气泡确认框确定按钮的回调
const removeTradeMark = async (id: number) => {
    //点击确定按钮删除已有品牌请求
    let result = await reqDeleteTrademark(id);
    if (result.code == 200) {
        //删除成功提示信息
        ElMessage({
            type: 'success',
            message: '删除品牌成功'
        });
        //再次获取已有的品牌数据
        getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
        ElMessage({
            type: 'error',
            message: '删除品牌失败'
        })
    }
}
// 点击添加品牌按钮(使用对话框收集品牌数据)
const addTrademark = () => {
    dialogFormVisible.value = true
    //清空收集数据
    trademarkParams.id = 0;
    trademarkParams.tmName = '';
    trademarkParams.logoUrl = '';
    //第一种写法:ts的问号语法
    // formRef.value?.clearValidate('tmName');
    // formRef.value?.clearValidate('logoUrl');
    nextTick(() => {
        formRef.value.clearValidate('tmName');
        formRef.value.clearValidate('logoUrl');
    })
}
// 点击修改品牌按钮(使用对话框收集品牌数据)
const updateTrademark = async (data: TradeMark) => {
    //清空校验规则错误提示信息
    nextTick(() => {
        formRef.value?.clearValidate('tmName');
        formRef.value?.clearValidate('logoUrl');
    })
    dialogFormVisible.value = true
    // trademarkParams.id = data.id;
    // trademarkParams.logoUrl = data.logoUrl;
    // trademarkParams.tmName = data.tmName;
    Object.assign(trademarkParams,data)
}
// 对话框内的确定与取消按钮
const cancel = () => {
    dialogFormVisible.value = false
}
const confirm = async () => {
    //在你发请求之前,要对于整个表单进行校验
    await formRef.value.validate()
    //调用这个方法进行全部表单相校验,如果校验全部通过，在执行后面的语法
    let result = await reqAddOrUpdateTrademark(trademarkParams);
    //添加|修改已有品牌
    if (result.code == 200) {
        //关闭对话框
        dialogFormVisible.value = false;
        //弹出提示信息
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        });
        //再次发请求获取已有全部的品牌数据
        getHasTrademark(trademarkParams.id ? pageNo.value : 1);
    } else {
        //添加品牌失败
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改品牌失败,原因：'+result.data : '添加品牌失败，原因：'+ result.data
        });
        //关闭对话框
        dialogFormVisible.value = false;
    }
}
// 表单校验规则对象
//品牌自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
    //是当表单元素触发blur时候,会触发此方法
    //自定义校验规则
    if (value.trim().length >= 2) {
        callBack();
    } else {
        //校验未通过返回的错误的提示信息
        callBack(new Error('品牌名称位数大于等于两位'))
    }
}
//品牌LOGO图片的自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    //如果图片上传
    if (value) {
        callBack();
    } else {
        callBack(new Error('LOGO图片务必上传'))
    }
}

//表单校验规则对象
const rules = {
    tmName: [
        //required:这个字段务必校验,表单项前面出来五角星
        //trigger:代表触发校验规则时机[blur、change]
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, validator: validatorLogoUrl }
    ]
}

</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>