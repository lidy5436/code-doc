# PDF文件转图片



## 安装 PyMuPDF

首先，我们需要安装 PyMuPDF 库，它是一个用于处理 PDF 和图像文件的库。在终端中运行以下命令进行安装：

```bash
pip install PyMuPDF
```

## 脚本说明

下面的 Python 脚本可以将 PDF 文件转换为图像。它可以处理单个 PDF 文件，也可以遍历文件夹中的所有 PDF 文件，并将它们转换为图像。转换过程中可以设置缩放因子和旋转角度，输出的图像格式默认为 `png`。

```python
import fitz  # PyMuPDF
import os

def pdf_to_images(pdf_path, output_folder, zoom_x=2.0, zoom_y=2.0, rotation_angle=0, fmt='png'):
    """
    将单个 PDF 文件转换为图像。
    
    :param pdf_path: PDF 文件的路径
    :param output_folder: 输出图像的文件夹路径
    :param zoom_x: 横向缩放因子
    :param zoom_y: 纵向缩放因子
    :param rotation_angle: 旋转角度
    :param fmt: 输出图像的格式
    """
    # 确保输出文件夹存在
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # 打开 PDF 文件
    pdf_document = fitz.open(pdf_path)
    base_name = os.path.splitext(os.path.basename(pdf_path))[0]  # 获取 PDF 文件名（不含扩展名）

    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)  # 加载每一页
        matrix = fitz.Matrix(zoom_x, zoom_y)  # 设置缩放
        if rotation_angle != 0:
            matrix = matrix * fitz.Matrix(1, 0, 0, 1, 0, 0).rotate(rotation_angle)  # 设置旋转
        pix = page.get_pixmap(matrix=matrix)  # 渲染页面为图像
        image_path = os.path.join(output_folder, f'{base_name}_page_{page_num + 1}.{fmt}')  # 生成图像文件名
        pix.save(image_path)  # 保存图像
        print(f'Saved: {image_path}')  # 打印保存信息

def process_path(input_path, output_folder, zoom_x=2.0, zoom_y=2.0, rotation_angle=0, fmt='png'):
    """
    处理输入路径，如果是单个 PDF 文件则转换为图像，
    如果是文件夹则遍历文件夹中的所有 PDF 文件并转换为图像。
    
    :param input_path: 输入的文件或文件夹路径
    :param output_folder: 输出图像的文件夹路径
    :param zoom_x: 横向缩放因子
    :param zoom_y: 纵向缩放因子
    :param rotation_angle: 旋转角度
    :param fmt: 输出图像的格式
    """
    # 判断输入路径是文件还是文件夹
    if os.path.isfile(input_path):
        if input_path.lower().endswith('.pdf'):
            pdf_to_images(input_path, output_folder, zoom_x, zoom_y, rotation_angle, fmt)  # 处理单个 PDF 文件
        else:
            print(f"文件 {input_path} 不是一个有效的 PDF 文件")
    elif os.path.isdir(input_path):
        for filename in os.listdir(input_path):  # 遍历文件夹中的所有文件
            if filename.lower().endswith('.pdf'):
                pdf_path = os.path.join(input_path, filename)
                pdf_to_images(pdf_path, output_folder, zoom_x, zoom_y, rotation_angle, fmt)  # 处理文件夹中的 PDF 文件
    else:
        print(f"路径 {input_path} 不是一个有效的文件或文件夹")

if __name__ == '__main__':
    input_path = 'C:/Users/crush/Desktop/pdfToImage'  # 替换为你的 PDF 文件或文件夹路径
    output_folder = 'C:/Users/crush/Desktop/pdfToImage/output'  # 图像输出文件夹
    process_path(input_path, output_folder)  # 处理输入路径并将 PDF 转换为图像
```

### 主要功能说明

- **pdf_to_images**: 将单个 PDF 文件转换为图像。可以指定输出文件夹、缩放因子、旋转角度和图像格式。
- **process_path**: 处理输入路径。如果是单个 PDF 文件则直接转换为图像；如果是文件夹，则遍历其中的所有 PDF 文件并进行转换。

### 使用方法

1. 替换 `input_path` 为你要转换的 PDF 文件或文件夹路径。
2. 替换 `output_folder` 为你希望保存图像的文件夹路径。
3. 运行脚本，即可将指定路径中的 PDF 文件转换为图像并保存在指定文件夹中。

这个脚本适用于需要将 PDF 文件转换为图像的各种场景，例如数据提取、文档分析等。