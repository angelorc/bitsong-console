<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown"
    persistent
    max-width="400"
    :value="true"
  >
    <v-card>
      <v-sheet height="100%">
        <v-container class="fill-height">
          <v-row>
            <v-col class="text-center">
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loading"
              ></v-progress-circular>
              <div v-show="!loading">
                <qrcode-stream v-if="error === null" :camera="camera" @decode="onDecode" @init="onInit"></qrcode-stream>
                <p class="text--red" v-else>{{ error }}</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>

      <v-card-actions>
        <v-btn text @click="switchCamera">
          <v-icon left>mdi-camera-flip</v-icon> Switch: {{ camera }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  components: {
    QrcodeStream
  },

  data() {
    return {
      error: null,
      loading: false,
      camera: 'rear'
    }
  },

  methods: {
    onDecode(decodedStr) {
      this.$emit('onDecode', decodedStr)
    },

    async onInit (promise) {
      this.loading = true

      try {
        const { capabilities } = await promise

        // successfully initialized
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          if (this.camera === 'rear') {
            this.error = "ERROR: installed cameras are not suitable. Try to switch camera"
          } else {
            this.error = "ERROR: installed cameras are not suitable."
          }
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      } finally {
        this.loading = false
      }
    },

    switchCamera() {
      this.loading = true
      this.error = null
      if (this.camera === 'rear') {
        this.camera = 'auto'
      } else if (this.camera === 'auto') {
        this.camera = 'front'
      } else {
        this.camera = 'rear'
      }
      this.loading = false
    }
  }
}
</script>
