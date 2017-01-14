<template>

  <div class="container">
    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">{{title}}</h4>
        </div>
        <div class="modal-body">
          <p>
              <img v-if="icon == 'ok'" class="icontag" src="../Images/ok.png" width="50px" height="50px"/>
              <img v-if="icon == 'error'" class="icontag" src="../Images/error.png" width="50px" height="50px"/>
            {{msg}}
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>
</div>

  <div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-header">
      <h1>Processing...</h1>
    </div>
    <div class="modal-body">
      <div class="progress progress-striped active">
        <div class="bar" style="width: 100%;"></div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    props: ['msg', 'title', 'icon']
  }
</script>

<style>
  .icontag{
    margin-right: 10px;
  }

</style>
