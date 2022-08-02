<template>
  <v-card ref="container" outlined :loading="loading">
    <v-card-title class="headline">
      <div class="container" style="border: 2px solid #e0e0e0;">
        <div class="card-date">
          <div class="date-title">
            Date
          </div>
          <v-list class="overflow-y-auto" nav :height="listHeight">
            <v-list-item-group active-class="primary--text">
              <v-list-item
                v-for="date in dates"
                :key="date"
                @click="display(date)"
                class="underline"
              >
                <v-list-item-avatar>
                  <v-icon>{{ "mdi-folder" }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ date }}</v-list-item-title>
                  <!-- <v-list-item-subtitle>
                    expired at:{{ date }}
                  </v-list-item-subtitle> -->
                  <!-- <div>
                    Date
                  </div> -->
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <!-- <div
            v-for="date in dates"
            @click="display(date)"
            class="date-list"
            :key="date"
          >
            {{ date }}
          </div> -->
        </div>
        <div class="card-image">
          <div class="image-title">Images</div>
          <div v-for="(image, key) in images" :key="key">
            <div class="image-row1">
              <div>
                <div>Images before session</div>
                <div class="image-1-1">
                  <div class="image">
                    <img :src="image.ref_image" alt="" class="image" />
                  </div>
                </div>
              </div>
              <div>
                <div>Images after session</div>
                <div class="image-1-2">
                  <div class="image">
                    <img :src="image.latest_image" alt="" class="image" />
                  </div>
                </div>
              </div>
            </div>
            <div class="image-name">{{ image.organ }}</div>
          </div>
        </div>
      </div>
    </v-card-title>
    <v-divider horizontal />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import { expiredAtInterval, isExpired } from "@/utils/dateUtils";
import { SessionImage, SessionText } from "@/store/models";
import sessionImageService from "@/service/api/sessionImageService";
import { EventBus } from "@/utils/event-bus";

@Component({
  filters: {
    expiredAtInterval: function(value: Date) {
      return expiredAtInterval(value);
    }
  }
})
export default class Programs extends Vue {
  @Prop({ default: null }) readonly userProfileId!: string;
  @Ref() readonly container: Vue | undefined;

  private totalImages: SessionImage[] = [];
  private images: SessionImage[] = [];
  private dates: string[] = [];
  private listHeight = this.getHeight();

  mounted() {
    console.log('session form')
    // const users = JSON.parse(localStorage.getItem("users") || "") 
    // const userId = atob(users[0].id);
    // console.log(userId, 'userid')
    sessionImageService.fetchByUserId(this.userProfileId).then(res => {
      console.log("session images are fetched: ", res);
      this.totalImages = res;
      let _dates = res.map((item: { date: any }) => item.date);
      _dates = _dates.filter((value: any, index: number, self: any) => {
        return self.indexOf(value) === index;
      });
      this.dates = _dates;
      if (_dates.length !== 0) {
        const _images = res.filter(
          (item: { date: any }) => item.date === _dates[0]
        );
        this.images = _images;
      }
    });
  }

  private display(date: string) {
    if (this.dates.length !== 0) {
      const _images = this.totalImages.filter(item => item.date === date);
      this.images = _images;
    }
  }
  private getHeight() {
    return Math.max(window.innerHeight - 490, 450);
  }
}
</script>
<style lang="scss">
@import "~vuetify/src/styles/main.sass";

.card-date {
  float: left;
  width: 30%;
  padding: 15px;
  // border: 2px solid rgb(12, 238, 61);
  height: 600px;
}
.date-title {
  display: flex;
  justify-content: center;
  font-size: 45px;
  padding-bottom: 30px;
  margin-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
}
.card-image {
  float: left;
  width: 70%;
  padding: 15px;
  border-left: 2px solid #e0e0e0;
  height: 600px;
}
.image-title {
  display: flex;
  justify-content: center;
  font-size: 45px;
  padding-bottom: 30px;
  margin-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
}
.container:after {
  display: flex;
  width: 100%;
  padding: 0;
  border: 2px solid #e0e0e0;
}
.underline {
  border-bottom: 2px solid #e0e0e0;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
// .container {
//   border: 2px solid rgb(12, 238, 61);
// }
.image-name {
  display: flex;
  justify-content: center;
  font-size: 35px;
}
.image-1-1 {
  width: 300px;
  height: 200px;
  border: 1px solid red;
}
.image-1-2 {
  width: 300px;
  height: 200px;
  border: 1px solid red;
}
.image-2-1 {
  width: 300px;
  height: 200px;
  border: 1px solid red;
}
.image-2-2 {
  width: 300px;
  height: 200px;
  border: 1px solid red;
}
.image-3-1 {
  width: 300px;
  height: 200px;
  border: 1px solid red;
}
.image-3-2 {
  width: 300px;
  height: 200px;
  border: 1px solid red;
}
.image-row1 {
  display: flex;
  justify-content: space-around;
}
.image-row2 {
  display: flex;
  justify-content: space-around;
}
.image-row3 {
  display: flex;
  justify-content: space-around;
}
.image {
  width: 100%;
  height: 100%;
}
.date-list {
  cursor: pointer;
}
#programs {
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;

  /*
    Introduced in IE 10.
    See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
  */
  -ms-user-select: none;
  user-select: none;

  .v-toolbar__content {
    padding: 0 !important;
  }

  .selected {
    color: #197bac;
    position: relative;

    &::before {
      background: currentColor;
      bottom: 2px;
      content: "";
      left: 0;
      opacity: 0.12;
      pointer-events: none;
      position: absolute;
      right: 4px;
      box-sizing: border-box;
      border-radius: 4px;
      top: 2px;
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
  }
}
</style>
