import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nz-page-header [nzGhost]="false">
      <nz-page-header-title>小组件面板测试</nz-page-header-title>
      <nz-page-header-subtitle>本页集成了本面板的所有功能</nz-page-header-subtitle>
      <nz-page-header-extra>
        <button nz-button (click)="editMode = !editMode">编辑/取消编辑</button>
        <button nz-button nzType="primary" (click)="showEditBtn=!showEditBtn">显示/隐藏编辑按钮</button>
      </nz-page-header-extra>
    </nz-page-header>
    <sim-widget-board [widgets]="widgets" [(editMode)]="editMode" (save)="save($event)" [showEditButton]="showEditBtn"
                      [extra]="{test:'123123',test2:'dfsfsd'}" [extraActions]="extraActions"></sim-widget-board>
  `,
  styles: []
})
export class AppComponent implements AfterViewInit {
  widgets: any;
  editMode = false;
  showEditBtn = false;
  extraActions = [
    {
      name: '测试EXTRA', type: 'danger', action: () => {
        console.log('RunRunRun');
      }
    }
  ];

  json = '[{"name":"页面1","data":[{"editorId":"mEPfjQ6A","attributes":{},"properties":{"name":"未命名","zIndex":10,"width":520,"height":275,"left":27,"top":19},"type":"demoList"},{"editorId":"Eb6nht28","attributes":{},"properties":{"name":"未命名","zIndex":10,"width":678,"height":201,"left":581,"top":23},"type":"demoIcon"},{"editorId":"Z8e8t4j4","attributes":{},"properties":{"name":"未命名","zIndex":10,"width":520,"height":275,"left":23,"top":307},"type":"demoIconList"},{"editorId":"C6wnGHrR","attributes":{},"properties":{"name":"未命名","zIndex":10,"width":517,"height":674,"left":25,"top":596},"type":"demoChat"},{"editorId":"W3ZQ8YA3","attributes":{},"properties":{"name":"未命名","zIndex":10,"width":706,"height":399,"left":574,"top":858},"type":"demoTodo"},{"editorId":"mhBxft38","attributes":{},"properties":{"name":"未命名","zIndex":10,"width":724,"height":277,"left":574,"top":249},"type":"demoCard"},{"editorId":"MwFnrzHx","attributes":{},"properties":{"name":"未命名","zIndex":10,"width":693,"height":274,"left":578,"top":575},"type":"demoCardSquare"},{"editorId":"a6aAPQDp","attributes":{},"properties":{"name":"未命名","zIndex":10,"width":1259,"height":336,"left":49,"top":2068},"type":"demoStat"},{"editorId":"fiCSz8t4","attributes":{},"properties":{"name":"未命名","zIndex":10,"width":1266,"height":436,"left":49,"top":1623},"type":"demoChart"},{"editorId":"HNwmKhQk","attributes":{},"properties":{"name":"未命名","zIndex":10,"width":1272,"height":348,"left":47,"top":1270},"type":"demoTable"}],"width":1330,"height":2400},{"name":"页面2","data":[{"editorId":"x62JDHms","attributes":{"content":{"name":"内容","type":"hidden","value":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" title=\\"Tiny Logo\\" src=\\"labs/android-chrome-256x256.png\\" alt=\\"TinyMCE Logo\\" width=\\"128\\" height=\\"128\\" /></p>\\n<h2 style=\\"text-align: center;\\">Welcome to the TinyMCE Cloud demo!</h2>\\n<h5 style=\\"text-align: center;\\">Note, this includes some \\"enterprise/premium\\" features.<br />Visit the <a href=\\"pricing\\">pricing page</a> to learn more about our premium plugins.</h5>\\n<p>Please try out the features provided in this full featured example.</p>\\n<h2>Got questions or need help?</h2>\\n<ul>\\n<li>Our <a class=\\"mceNonEditable\\" href=\\"http://127.0.0.1:4200/\\">documentation</a> is a great resource for learning how to configure TinyMCE.</li>\\n<li>Have a specific question? Try the <a href=\\"https://stackoverflow.com/questions/tagged/tinymce\\" target=\\"_blank\\" rel=\\"noopener\\"><code>tinymce</code> tag at Stack Overflow</a>.</li>\\n<li>We also offer enterprise grade support as part of <a href=\\"pricing\\">TinyMCE premium subscriptions</a>.</li>\\n</ul>\\n<h2>A simple table to play with</h2>\\n<table style=\\"border-collapse: collapse; width: 100%;\\" border=\\"1\\">\\n<thead>\\n<tr>\\n<th>Product</th>\\n<th>Cost</th>\\n<th>Really?</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>TinyMCE Cloud</td>\\n<td>Get started for free</td>\\n<td>YES!</td>\\n</tr>\\n<tr>\\n<td>Plupload</td>\\n<td>Free</td>\\n<td>YES!</td>\\n</tr>\\n</tbody>\\n</table>\\n<h2>Found a bug?</h2>\\n<p>If you think you have found a bug please create an issue on the <a href=\\"https://github.com/tinymce/tinymce/issues\\">GitHub repo</a> to report it to the developers.</p>\\n<h2>Finally ...</h2>\\n<p>Don\'t forget to check out our other product <a href=\\"http://www.plupload.com\\" target=\\"_blank\\" rel=\\"noopener\\">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</p>\\n<p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.<br />All the best from the TinyMCE team.</p>"},"title":{"group":"属性","name":"标题","type":"text","value":"富文本标题"}},"properties":{"name":"未命名","zIndex":10,"width":724,"height":739,"left":55,"top":35},"type":"richText"}],"width":1600,"height":900}]';

  ngAfterViewInit(): void {
    this.widgets = JSON.parse(this.json);
  }

  save(widgets: any): void {
    console.log(widgets);
    this.widgets = JSON.parse(JSON.stringify(this.widgets));
  }


}
