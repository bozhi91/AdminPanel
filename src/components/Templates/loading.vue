<template>

  <div v-show="show" class="container">
    <!-- Modal -->
    <div v-show="show" class="modal fade" :class="{'in': show}" id="myModal" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">{{title}}</h4>
        </div>
        <div class="modal-body">

          <img class="icontag" src="../Images/load.gif" width="200px" height="100px"/>
          {{msg}}

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>


<script>
  export default {
    props: {
      msg: {
        required: true
      },
      show: {
        required: true,
        type: Boolean,
        twoWay: true
      }
    }
  }
</script>

<style>
  .icontag{
  }

  .custp{
    margin-bottom: -50px;
    margin-top: -50px;
  }

</style>
